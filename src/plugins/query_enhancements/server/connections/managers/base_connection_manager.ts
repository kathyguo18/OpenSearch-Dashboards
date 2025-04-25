/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpenSearchDashboardsRequest, RequestHandlerContext } from 'src/core/server';

export abstract class BaseConnectionManager {
  constructor() {}

  abstract getResources(
    context: RequestHandlerContext,
    request: OpenSearchDashboardsRequest
  ): Promise<unknown>;
}
