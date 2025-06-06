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

import React from 'react';
import { shallow } from 'enzyme';
import { UiSettingsType } from '../../../../../../core/public';

import { AdvancedSettingsVoiceAnnouncement } from './advanced_settings_voice_announcement';

const settingPartial = {
  name: 'name',
  isOverridden: false,
  isPermissionControlled: false,
  type: 'string' as UiSettingsType,
  value: 'value',
  defVal: 'defVal',
  optionLabels: { label: 'label' },
  description: 'description',
  displayName: 'displayName',
  isCustom: false,
  requiresPageReload: false,
  options: [],
  validation: { regex: /a/, message: 'message' },
  category: ['category'],
  readOnly: false,
};

const testProps = {
  nothing: {
    query: '',
    filteredSettings: [
      {
        ariaName: 'General',
        ...settingPartial,
      },
    ],
  },
  searchResult: {
    query: 'dark theme',
    filteredSettings: [
      {
        ariaName: 'General',
        ...settingPartial,
      },
    ],
  },
};

describe('Advanced Settings: Voice Announcement', () => {
  it('should render nothing', async () => {
    const { query, filteredSettings } = testProps.nothing;

    const component = shallow(
      <AdvancedSettingsVoiceAnnouncement queryText={query} settings={{ filteredSettings }} />
    );

    expect(component).toMatchSnapshot();
  });

  it('should render announcement', async () => {
    const { query, filteredSettings } = testProps.searchResult;

    const component = shallow(
      <AdvancedSettingsVoiceAnnouncement queryText={query} settings={{ filteredSettings }} />
    );

    expect(component).toMatchSnapshot();
  });
});
