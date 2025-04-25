/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { schema } from '@osd/config-schema';
import { IRouter } from 'opensearch-dashboards/server';
import { BASE_API } from '../../../common';
import { resourceManagerService } from '../../connections/resource_manager_service';
import { coerceStatusCode } from '..';

export function registerResourceRoutes(router: IRouter) {
  router.post(
    {
      path: `${BASE_API}/{dataConnectionType}/{dataConnectionId}/resources/{resourceType}/{resourceName?}`,
      validate: {
        params: schema.object({
          dataConnectionType: schema.string(),
          dataConnectionId: schema.string(), // this is the DQS datasource name, which is unique
          resourceType: schema.string(),
          resourceName: schema.maybe(schema.string()),
        }),
        query: schema.object({}, { unknowns: 'allow' }),
        body: schema.maybe(schema.any()),
      },
    },
    async (context, request, response) => {
      const { dataConnectionType } = request.params as any;
      const manager = resourceManagerService.getManager(dataConnectionType);
      if (!manager) {
        return response.notFound();
      }
      try {
        const resourcesResponse = (await manager.getResources(context, request)) as any;
        return response.ok({ body: resourcesResponse });
      } catch (error) {
        const errorObj = error as any;
        return response.customError({
          body: 'Unable to get resources',
          ...errorObj,
          statusCode: coerceStatusCode(errorObj.statusCode),
        });
      }
    }
  );
}
