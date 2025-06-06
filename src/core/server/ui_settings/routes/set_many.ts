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

import { schema, ValidationError } from '@osd/config-schema';

import { IRouter } from '../../http';
import { SavedObjectsErrorHelpers } from '../../saved_objects';
import { CannotOverrideError } from '../ui_settings_errors';
import { UiSettingScope } from '../types';

const validate = {
  body: schema.object({
    changes: schema.object({}, { unknowns: 'allow' }),
  }),
  query: schema.object(
    {
      scope: schema.maybe(
        schema.oneOf([
          schema.literal(UiSettingScope.GLOBAL),
          schema.literal(UiSettingScope.USER),
          schema.literal(UiSettingScope.WORKSPACE),
          schema.literal(UiSettingScope.DASHBOARD_ADMIN),
        ])
      ),
    },
    { unknowns: 'allow' }
  ),
};

export function registerSetManyRoute(router: IRouter) {
  router.post(
    { path: '/api/opensearch-dashboards/settings', validate },
    async (context, request, response) => {
      try {
        const uiSettingsClient = context.core.uiSettings.client;

        const { changes } = request.body;
        const { scope } = request.query;

        await uiSettingsClient.setMany(changes, scope);

        return response.ok({
          body: {
            settings: await uiSettingsClient.getUserProvided(scope),
          },
        });
      } catch (error) {
        if (SavedObjectsErrorHelpers.isSavedObjectsClientError(error)) {
          return response.customError({
            body: error,
            statusCode: error.output.statusCode,
          });
        }

        if (error instanceof CannotOverrideError || error instanceof ValidationError) {
          return response.badRequest({ body: error });
        }

        throw error;
      }
    }
  );
}
