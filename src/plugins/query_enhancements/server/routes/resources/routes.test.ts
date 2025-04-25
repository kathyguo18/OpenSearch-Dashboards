/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { registerResourceRoutes } from './routes';
import { resourceManagerService } from '../../connections/resource_manager_service';
import { BASE_API } from '../../../common';
import supertest from 'supertest';
import { BaseConnectionManager } from '../../connections/managers/base_connection_manager';
import { OpenSearchDashboardsRequest, RequestHandlerContext } from '../../../../../core/server';
import { setupServer } from '../../../../../core/server/test_utils';

class TestManager extends BaseConnectionManager {
  getResourcesSpy: (
    context: RequestHandlerContext,
    request: OpenSearchDashboardsRequest
  ) => Promise<unknown>;
  constructor(
    getResourceSpy: (
      context: RequestHandlerContext,
      request: OpenSearchDashboardsRequest
    ) => Promise<unknown>
  ) {
    super();
    this.getResourcesSpy = getResourceSpy;
  }

  getResources(
    context: RequestHandlerContext,
    request: OpenSearchDashboardsRequest
  ): Promise<unknown> {
    return this.getResourcesSpy(context, request);
  }
}

describe('Resource Routes', () => {
  const DATA_CONNECTION_TYPE = 'datatype';
  const DATA_CONNECTION_ID = 'dataconnectionid';

  const testSetup = async () => {
    const { server, httpSetup } = await setupServer();
    const router = httpSetup.createRouter('');
    registerResourceRoutes(router);
    const dynamicConfigService = {
      getClient: jest.fn(),
      getAsyncLocalStore: jest.fn(),
      createStoreFromRequest: jest.fn(),
    };
    await server.start({ dynamicConfigService });
    return httpSetup;
  };

  it('should connect to manager based on data connection type', async () => {
    const getResourcesSpy = jest.fn().mockResolvedValue({ message: 'succeed' });
    const manager = new TestManager(getResourcesSpy);
    jest
      .spyOn(resourceManagerService, 'getManager')
      .mockImplementation((type: string) => (type === DATA_CONNECTION_TYPE ? manager : undefined));

    const httpSetup = await testSetup();
    const result = await supertest(httpSetup.server.listener)
      .post(`${BASE_API}/${DATA_CONNECTION_TYPE}/${DATA_CONNECTION_ID}/resources/resourceType`)
      .send({})
      .expect(200);
    expect(result.body.message).toEqual('succeed');
  });

  it('should return 404 when data connection type is not registered', async () => {
    jest.spyOn(resourceManagerService, 'getManager').mockReturnValue(undefined);

    const httpSetup = await testSetup();
    const result = await supertest(httpSetup.server.listener)
      .post(`${BASE_API}/${DATA_CONNECTION_TYPE}/${DATA_CONNECTION_ID}/resources/resourceType`)
      .send({})
      .expect(404);
    expect(result.body.message).toEqual('Not Found');
  });

  it('should return error when get resources failed', async () => {
    const getResourcesSpy = jest.fn().mockRejectedValue({ message: 'failed' });
    const manager = new TestManager(getResourcesSpy);
    jest
      .spyOn(resourceManagerService, 'getManager')
      .mockImplementation((type: string) => (type === DATA_CONNECTION_TYPE ? manager : undefined));

    const httpSetup = await testSetup();
    const result = await supertest(httpSetup.server.listener)
      .post(`${BASE_API}/${DATA_CONNECTION_TYPE}/${DATA_CONNECTION_ID}/resources/resourceType`)
      .send({})
      .expect(503);
    expect(result.body.message).toEqual('Unable to get resources');
  });
});
