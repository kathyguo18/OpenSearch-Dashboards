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

import { Type } from '@osd/config-schema';

/**
 * UI element type to represent the settings.
 * @public
 * */
export type UiSettingsType =
  | 'undefined' // I don't know why malformed UiSettings objects exist
  | 'json'
  | 'markdown'
  | 'number'
  | 'select'
  | 'boolean'
  | 'string'
  | 'array'
  | 'image';

/**
 * UiSettings deprecation field options.
 * @public
 * */
export interface DeprecationSettings {
  /** Deprecation message */
  message: string;
  /** Key to documentation links */
  docLinksKey: string;
}

/**
 * UiSettings scope options.
 * @experimental
 */
export enum UiSettingScope {
  GLOBAL = 'global',
  USER = 'user',
  WORKSPACE = 'workspace',
  DASHBOARD_ADMIN = 'dashboard_admin',
}

/**
 * UiSettings parameters defined by the plugins.
 * @public
 * */
export interface UiSettingsParams<T = unknown> {
  /** title in the UI */
  name?: string;
  /**
   * scope of the setting item
   */
  scope?: UiSettingScope | UiSettingScope[];
  /** default value to fall back to if a user doesn't provide any */
  value?: T;
  /** description provided to a user in UI */
  description?: string;
  /** used to group the configured setting in the UI */
  category?: string[];
  /** array of permitted values for this setting */
  options?: string[];
  /** text labels for 'select' type UI element */
  optionLabels?: Record<string, string>;
  /** a flag indicating whether new value applying requires page reloading */
  requiresPageReload?: boolean;
  /** a flag indicating that the source of truth is stored in browser local storage, not in saved object, which only contains the fallback */
  preferBrowserSetting?: boolean;
  /** a flag indicating that value cannot be changed */
  readonly?: boolean;
  /** defines a type of UI element {@link UiSettingsType} */
  type?: UiSettingsType;
  /** optional deprecation information. Used to generate a deprecation warning. */
  deprecation?: DeprecationSettings;
  /*
   * Allows defining a custom validation applicable to value change on the client.
   * @deprecated
   * Use schema instead.
   */
  validation?: ImageValidation | StringValidation;
  /*
   * Value validation schema
   * Used to validate value on write and read.
   */
  schema: Type<T>;
}

/**
 * A sub-set of {@link UiSettingsParams} exposed to the client-side.
 * @public
 * */
export type PublicUiSettingsParams = Omit<UiSettingsParams, 'schema'>;

/**
 * Allows regex objects or a regex string
 * @public
 * */
export type StringValidation = StringValidationRegex | StringValidationRegexString;

/**
 * StringValidation with regex object
 * @public
 * */
export interface StringValidationRegex {
  regex: RegExp;
  message: string;
}

/**
 * StringValidation as regex string
 * @public
 * */
export interface StringValidationRegexString {
  regexString: string;
  message: string;
}

/**
 * @public
 * */
export interface ImageValidation {
  maxSize: {
    length: number;
    description: string;
  };
}

/**
 * Describes the values explicitly set by user.
 * @public
 * */
export interface UserProvidedValues<T = any> {
  userValue?: T;
  /** Use for disable the setting when it has been overridden by server config */
  isOverridden?: boolean;
  /** Use for disable the setting when it has been controlled by saved object permissions */
  isPermissionControlled?: boolean;
}
