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

import * as Rx from 'rxjs';
import type { PublicMethodsOf } from '@osd/utility-types';
import { UiSettingsService } from './';
import { IUiSettingsClient } from './types';

const createSetupContractMock = () => {
  const setupContract: jest.Mocked<IUiSettingsClient> = {
    getAll: jest.fn(),
    getDefault: jest.fn(),
    get: jest.fn(),
    get$: jest.fn(),
    getUserProvidedWithScope: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
    isDeclared: jest.fn(),
    isDefault: jest.fn(),
    isCustom: jest.fn(),
    isOverridden: jest.fn(),
    overrideLocalDefault: jest.fn(),
    getUpdate$: jest.fn(),
    getSaved$: jest.fn(),
    getUpdateErrors$: jest.fn(),
  };
  setupContract.get$.mockReturnValue(new Rx.Subject<any>());
  setupContract.getUpdate$.mockReturnValue(new Rx.Subject<any>());
  setupContract.getSaved$.mockReturnValue(new Rx.Subject<any>());
  setupContract.getUpdateErrors$.mockReturnValue(new Rx.Subject<any>());
  setupContract.getAll.mockReturnValue({});

  return setupContract;
};

type UiSettingsServiceContract = PublicMethodsOf<UiSettingsService>;
const createMock = () => {
  const mocked: jest.Mocked<UiSettingsServiceContract> = {
    setup: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  };

  mocked.setup.mockReturnValue(createSetupContractMock());
  // UiSettings.start returns the client that is returned by setup
  mocked.start.mockReturnValue(createSetupContractMock());
  return mocked;
};

export const uiSettingsServiceMock = {
  create: createMock,
  createSetupContract: createSetupContractMock,
  createStartContract: createSetupContractMock,
};
