/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// @ts-expect-error
import fetchMock from 'fetch-mock/es5/client';
import * as Rx from 'rxjs';
import { takeUntil, toArray } from 'rxjs/operators';
import { UiSettingScope } from '../../server/ui_settings/types';
import { setup as httpSetup } from '../../test_helpers/http_test_setup';
import { UiSettingsApi } from './ui_settings_api';

// Use UiSettingScope.GLOBAL as default to let the API operate in the global scope.
function setup(scope?: UiSettingScope) {
  const { http } = httpSetup((injectedMetadata) => {
    injectedMetadata.getBasePath.mockReturnValue('/foo/bar');
  });

  const uiSettingsApi = new UiSettingsApi(http, scope);

  return {
    http,
    uiSettingsApi,
  };
}

async function settlePromise<T>(promise: Promise<T>) {
  try {
    return {
      isResolved: true,
      result: await promise,
    };
  } catch (error) {
    return {
      isRejected: true,
      error,
    };
  }
}

afterEach(() => {
  fetchMock.restore();
});

describe('#batchSet', () => {
  it('sends a single without scope change immediately', async () => {
    fetchMock.mock('*', {
      body: { settings: {} },
    });

    const { uiSettingsApi } = setup();
    await uiSettingsApi.batchSet('foo', 'bar');
    const calls = fetchMock.calls();
    expect(calls.length).toBe(1);
    const [url, options] = calls[0];
    expect(url).toContain('/api/opensearch-dashboards/settings');

    expect(options.method).toBe('POST');

    expect(fetchMock.calls()).toMatchSnapshot('single without scope');
  });

  it('sends a single change to a specific scope immediately', async () => {
    fetchMock.mock('*', {
      body: { settings: {} },
    });

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);
    await uiSettingsApi.batchSet('foo', 'bar');

    const [url, options] = fetchMock.lastCall();

    expect(url).toContain('/api/opensearch-dashboards/settings?scope=global');

    expect(options.method).toBe('POST');
    expect(fetchMock.calls()).toMatchSnapshot('single with scope');
  });

  it('buffers changes while first request is in progress, sends buffered changes after first request completes', async () => {
    fetchMock.mock('*', {
      body: { settings: {} },
    });

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);

    uiSettingsApi.batchSet('foo', 'bar');
    const finalPromise = uiSettingsApi.batchSet('box', 'bar');

    expect(uiSettingsApi.hasPendingChanges()).toBe(true);
    await finalPromise;
    const calls = fetchMock.calls();
    expect(calls.length).toBe(2);
    expect(fetchMock.calls()).toMatchSnapshot('final, includes both requests');
  });

  it('batches changes and sends buffered changes', async () => {
    fetchMock.mock('*', {
      body: { settings: {} },
    });

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);
    uiSettingsApi.batchSet('0', '0');
    uiSettingsApi.batchSet('1', '1');
    uiSettingsApi.batchSet('2', '2');
    uiSettingsApi.batchSet('3', '3');
    uiSettingsApi.batchSet('4', '4');
    const finalPromise = uiSettingsApi.batchSet('5', '5');

    expect(uiSettingsApi.hasPendingChanges()).toBe(true);

    await finalPromise;

    expect(fetchMock.calls()).toMatchSnapshot('able to batch requests');
  });

  it('Overwrites previously buffered values with new values for the same key', async () => {
    fetchMock.mock('*', {
      body: { settings: {} },
    });

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);

    uiSettingsApi.batchSet('foo', 'a');
    uiSettingsApi.batchSet('foo', 'b');
    uiSettingsApi.batchSet('foo', 'c');
    await uiSettingsApi.batchSet('foo', 'd');

    expect(fetchMock.calls()).toMatchSnapshot('two requests, foo=d in final');
  });

  it('Buffers are always clear of previously buffered changes', async () => {
    fetchMock.mock('*', {
      body: { settings: {} },
    });

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);
    uiSettingsApi.batchSet('foo', 'bar');
    uiSettingsApi.batchSet('bar', 'foo');
    await uiSettingsApi.batchSet('bar', 'box');

    expect(fetchMock.calls()).toMatchSnapshot('two requests, second only sends bar, not foo');
  });

  it('rejects on 404 response', async () => {
    fetchMock.mock('*', {
      status: 404,
      body: 'not found',
    });

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);
    await expect(uiSettingsApi.batchSet('foo', 'bar')).rejects.toThrowErrorMatchingSnapshot();
  });

  it('rejects on 301', async () => {
    fetchMock.mock('*', {
      status: 301,
      body: 'redirect',
    });

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);
    await expect(uiSettingsApi.batchSet('foo', 'bar')).rejects.toThrowErrorMatchingSnapshot();
  });

  it('rejects on 500', async () => {
    fetchMock.mock('*', {
      status: 500,
      body: 'redirect',
    });

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);
    await expect(uiSettingsApi.batchSet('foo', 'bar')).rejects.toThrowErrorMatchingSnapshot();
  });

  it('rejects all promises for batched requests that fail', async () => {
    fetchMock.once('*', {
      body: { settings: {} },
    });
    fetchMock.once(
      '*',
      {
        status: 400,
        body: { message: 'invalid' },
      },
      {
        overwriteRoutes: false,
      }
    );

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);
    // trigger the initial sync request, which enabled buffering
    uiSettingsApi.batchSet('foo', 'bar');

    // buffer some requests so they will be sent together
    await expect(
      Promise.all([
        settlePromise(uiSettingsApi.batchSet('foo', 'a')),
        settlePromise(uiSettingsApi.batchSet('bar', 'b')),
        settlePromise(uiSettingsApi.batchSet('baz', 'c')),
      ])
    ).resolves.toMatchSnapshot('promise rejections');

    // ensure only two requests were sent
    expect(fetchMock.calls()).toHaveLength(2);
  });
});

describe('#getAll', () => {
  it('sends a GET request without scope in query string if constructed without scope', async () => {
    const mockResponse = { settings: { theme: 'dark' } };
    fetchMock.mock('*', {
      status: 200,
      body: mockResponse,
    });

    const { uiSettingsApi } = setup();

    const result = await uiSettingsApi.getAll();

    const [url, options] = fetchMock.lastCall();
    expect(url.endsWith('/api/opensearch-dashboards/settings')).toEqual(true);
    expect(options.method).toBe('GET');
    expect(result).toEqual(mockResponse);
  });

  it('sends a GET request with scope in query string if constructed with scope', async () => {
    const mockResponse = { settings: { theme: 'dark' } };
    fetchMock.mock('*', {
      status: 200,
      body: mockResponse,
    });

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);

    const result = await uiSettingsApi.getAll();

    const [url, options] = fetchMock.lastCall();
    expect(url.endsWith('/api/opensearch-dashboards/settings?scope=global')).toEqual(true);
    expect(options.method).toBe('GET');
    expect(result).toEqual(mockResponse);
  });
});

describe('#getLoadingCount$()', () => {
  it('emits the current number of active requests', async () => {
    fetchMock.once('*', {
      body: { settings: {} },
    });

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);
    const done$ = new Rx.Subject();
    const promise = uiSettingsApi.getLoadingCount$().pipe(takeUntil(done$), toArray()).toPromise();

    await uiSettingsApi.batchSet('foo', 'bar');
    done$.next();

    await expect(promise).resolves.toEqual([0, 1, 0]);
  });

  it('decrements loading count when requests fail', async () => {
    fetchMock.once('*', {
      body: { settings: {} },
    });
    fetchMock.once(
      '*',
      {
        status: 400,
        body: 'invalid',
      },
      {
        overwriteRoutes: false,
      }
    );

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);
    const done$ = new Rx.Subject();
    const promise = uiSettingsApi.getLoadingCount$().pipe(takeUntil(done$), toArray()).toPromise();

    await uiSettingsApi.batchSet('foo', 'bar');
    await expect(uiSettingsApi.batchSet('foo', 'bar')).rejects.toThrowError();

    done$.next();
    await expect(promise).resolves.toEqual([0, 1, 0, 1, 0]);
  });
});

describe('#stop', () => {
  it('completes any loading count observables', async () => {
    fetchMock.once('*', {
      body: { settings: {} },
    });

    const { uiSettingsApi } = setup(UiSettingScope.GLOBAL);
    const promise = Promise.all([
      uiSettingsApi.getLoadingCount$().pipe(toArray()).toPromise(),
      uiSettingsApi.getLoadingCount$().pipe(toArray()).toPromise(),
    ]);

    const batchSetPromise = uiSettingsApi.batchSet('foo', 'bar');
    uiSettingsApi.stop();

    // both observables should emit the same values, and complete before the request is done loading
    await expect(promise).resolves.toEqual([
      [0, 1],
      [0, 1],
    ]);
    await batchSetPromise;
  });
});
