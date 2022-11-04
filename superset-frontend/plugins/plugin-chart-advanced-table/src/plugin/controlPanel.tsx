/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {
  t,
  tn,
  FeatureFlag,
  isFeatureEnabled,
  DEFAULT_METRICS,
  QueryMode,
  QueryFormColumn,
  QueryResponse,
  ensureIsArray,
  validateNonEmpty,
  legacyValidateInteger,
} from '@superset-ui/core';
import {
  Dataset,
  ControlConfig,
  ControlStateMapping,
  ControlPanelConfig,
  ControlPanelsContainerProps,
  sections,
  QueryModeLabel,
  sharedControls,
  ControlPanelState,
  ControlState,
  formatSelectOptions,
} from '@superset-ui/chart-controls';

export const PAGE_SIZE_OPTIONS = formatSelectOptions<number>([
  [0, t('page_size.all')],
  10,
  20,
  50,
  100,
  200,
]);

function getQueryMode(controls: ControlStateMapping): QueryMode {
  const mode = controls?.query_mode?.value;
  if (mode === QueryMode.aggregate || mode === QueryMode.raw) {
    return mode as QueryMode;
  }
  const rawColumns = controls?.all_columns?.value as
    | QueryFormColumn[]
    | undefined;
  const hasRawColumns = rawColumns && rawColumns.length > 0;
  return hasRawColumns ? QueryMode.raw : QueryMode.aggregate;
}

/**
 * Visibility check
 */
function isQueryMode(mode: QueryMode) {
  return ({ controls }: Pick<ControlPanelsContainerProps, 'controls'>) =>
    getQueryMode(controls) === mode;
}

const isAggMode = isQueryMode(QueryMode.aggregate);
const isRawMode = isQueryMode(QueryMode.raw);

const queryMode: ControlConfig<'RadioButtonControl'> = {
  type: 'RadioButtonControl',
  label: t('Query mode'),
  default: null,
  options: [
    [QueryMode.aggregate, QueryModeLabel[QueryMode.aggregate]],
    [QueryMode.raw, QueryModeLabel[QueryMode.raw]],
  ],
  mapStateToProps: ({ controls }) => ({ value: getQueryMode(controls) }),
  rerender: ['columns', 'groupby', 'metrics', 'percent_metrics'],
};

const validateAggControlValues = (
  controls: ControlStateMapping,
  values: any[],
) => {
  const areControlsEmpty = values.every(val => ensureIsArray(val).length === 0);
  // @ts-ignore
  return areControlsEmpty && isAggMode({ controls })
    ? [t('Group By, Metrics, or Percent Metrics must have a value')]
    : [];
};

const validateColumnValues = (
  controls: ControlStateMapping,
  values: any[],
  state: ControlPanelState,
) => {
  const invalidColumns = values.filter(
    (val: any) =>
      val !== undefined &&
      !state.datasource?.columns.some(col => col.name === val),
  );
  return invalidColumns.length !== 0
    ? [
        tn(
          'Invalid column: %s',
          'Invalid columns: %s',
          invalidColumns.length,
          invalidColumns.join(', '),
        ),
      ]
    : [];
};

const validateAggColumnValues = (
  controls: ControlStateMapping,
  values: any[],
  state: ControlPanelState,
) => {
  const result = validateAggControlValues(controls, values);
  if (result.length === 0 && isAggMode({ controls })) {
    return validateColumnValues(controls, values[1], state);
  }
  return result;
};

// function isIP(v: unknown) {
//   if (typeof v === 'string' && v.trim().length > 0) {
//     //console.log(v.trim());
//     // Test IP
//     if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(v.trim())) {
//       return true;
//     }
//     // Test CIDR
//     return cidrRegex({ exact: true }).test(v.trim());
//   }
//   return false;
// }

// function validateIP(v: unknown) {

//   if (Array.isArray(v)) {
//     //console.log('is array');
//     if (v.every(isIP)) {
//       return false;
//     }
//   }
//   else {
//     if (isIP(v)) {
//       return false;
//     }
//   }

//   return (' is expected to be an IP address in dotted decimal or CIDR notation');
// }

// /**
//  * Validates the adhoc filter control. Each filter has a subject (the column name for example SRC_PORT) and a comparator (the value being tested),
//  * it can be a single value for operators like !=, >, <= etc
//  * or it can be an array of values for example when the IN or NOT IN operator is used.
//  *
//  * @param filters an array of adhoc filter with the following attributes
//  * @param state the current state of the adhoc filter control it includes a copy of the columns as defined in the dataset model
//  * @returns a string explaining the reason why the control is in an invalid state or false if there is no errors
//  */
// function adhocFilterValidator(filters: unknown, state: ControlState) {
//   if (Array.isArray(filters)) {
//     for (let i = 0; i < filters.length; i++) {
//       const filter = filters[i];
//       // Find the corresponding column in the model
//       const column = state.columns.find((c: any) => c.column_name == filter.subject);
//       if (typeof column !== 'undefined' && typeof column.type !== 'undefined') {
//         // Currently supporting 2 types of columns
//         // IPV4
//         // IPV4 FILTER
//         if (column.type.includes('IPV4')) {
//           const v = filter.comparator;
//           // check single value
//           if (typeof v === 'string' && v.trim().length > 0) {
//             const error = validateIP(v.trim());
//             if (error) {
//               return filter.subject + error;
//             }
//           }
//           // check array of values
//           else if (Array.isArray(v)) {
//             for (let index = 0; index < v.length; index++) {
//               const element = v[index];
//               const error = validateIP(element.trim());
//               if (error) {
//                 return filter.subject + error;
//               }
//             }
//           }
//         }
//         // else we assume the value is okay
//         // more type validators can be added here
//       }
//     }
//   }
//   return false;
// }

const defineSavedMetrics = (datasource: Dataset | QueryResponse | null) =>
  datasource?.hasOwnProperty('metrics')
    ? (datasource as Dataset)?.metrics || []
    : DEFAULT_METRICS;

const columnChoices = (datasource: any) => {
  if (datasource?.columns) {
    return datasource.columns
      .map((col: any) => [col.column_name, col.verbose_name || col.column_name])
      .sort((opt1: any, opt2: any) =>
        opt1[1].toLowerCase() > opt2[1].toLowerCase() ? 1 : -1,
      );
  }
  return [];
};

const config: ControlPanelConfig = {
  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    sections.legacyTimeseriesTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        /*[
          {
            name: 'query_mode',
            config: queryMode,
          },
        ],*/
        [
          {
            name: 'groupby',
            config: {
              type: 'SelectControl',
              label: t('Group by'),
              description: sharedControls.groupby.description,
              multi: true,
              freeForm: true,
              allowAll: true,
              default: [],
              valueKey: 'column_name',
              includeTime: false,
              canSelectAll: true,
              visibility: isAggMode,
              mapStateToProps: (
                state: ControlPanelState,
                controlState: ControlState,
              ) => {
                const { controls } = state;
                const originalMapStateToProps =
                  sharedControls?.groupby?.mapStateToProps;
                const newState =
                  originalMapStateToProps?.(state, controlState) ?? {};
                /* newState.externalValidationErrors = validateAggColumnValues(
                  controls,
                  [
                    controls.metrics?.value,
                    controlState.value,
                    controls.percent_metrics?.value,
                  ],
                  state,
                );
                */
                return newState;
              },
              rerender: ['metrics', 'percent_metrics'],
              canCopy: true,
            } as typeof sharedControls.groupby,
          },
        ],
        [
          {
            name: 'metrics',
            override: {
              visibility: isAggMode,
              validators: [],
              mapStateToProps: (
                state: ControlPanelState,
                controlState: ControlState,
              ) => {
                const { controls } = state;
                const originalMapStateToProps =
                  sharedControls?.metrics?.mapStateToProps;
                const newState =
                  originalMapStateToProps?.(state, controlState) ?? {};
                newState.externalValidationErrors = validateAggControlValues(
                  controls,
                  [
                    controls.groupby?.value,
                    controlState.value,
                    controls.percent_metrics?.value,
                  ],
                );
                return newState;
              },
              rerender: ['groupby', 'percent_metrics'],
            },
          },
        ],
        [
          {
            name: 'percent_metrics',
            config: {
              type: 'MetricsControl',
              label: t('Percentage metrics'),
              description: t(
                'Metrics for which percentage of total are to be displayed. Calculated from only data within the row limit.',
              ),
              multi: true,
              visibility: isAggMode,
              mapStateToProps: ({ datasource, controls }, controlState) => ({
                columns: datasource?.columns || [],
                savedMetrics: defineSavedMetrics(datasource),
                datasourceType: datasource?.type,
                queryMode: getQueryMode(controls),
                externalValidationErrors: validateAggControlValues(controls, [
                  controls.groupby?.value,
                  controls.metrics?.value,
                  controlState.value,
                ]),
              }),
              rerender: ['groupby', 'metrics'],
              default: [],
              validators: [],
            },
          },
        ],
        [
          {
            name: 'columns',
            config: {
              type: 'SelectControl',
              label: t('Columns'),
              description: t('Columns to display'),
              multi: true,
              freeForm: true,
              allowAll: true,
              default: [],
              canSelectAll: true,
              valueKey: 'column_name',
              mapStateToProps: (
                state: ControlPanelState,
                controlState: ControlState,
              ) => {
                const { controls } = state;
                const originalMapStateToProps =
                  sharedControls?.columns?.mapStateToProps;
                const newState =
                  originalMapStateToProps?.(state, controlState) ?? {};
                /*
                newState.externalValidationErrors =
                  // @ts-ignore
                  isRawMode({ controls }) &&
                  ensureIsArray(controlState.value).length === 0
                    ? [t('must have a value')]
                    : isRawMode({ controls })
                    ? validateColumnValues(
                        controls,
                        ensureIsArray(controlState.value),
                        state,
                      )
                    : [];
                    */
                return newState;
              },
              visibility: () => true,
              canCopy: true,
            } as typeof sharedControls.groupby,
          },
        ],
        [
          {
            name: 'pivot_columns',
            config: {
              type: 'SelectControl',
              label: t('Pivot Columns'),
              description: t('Pivotable Columns'),
              multi: true,
              freeForm: true,
              allowAll: true,
              default: [],
              canSelectAll: true,
              valueKey: 'column_name',
              mapStateToProps: (
                state: ControlPanelState,
                controlState: ControlState,
              ) => {
                const { controls } = state;
                const originalMapStateToProps =
                  sharedControls?.columns?.mapStateToProps;
                const newState =
                  originalMapStateToProps?.(state, controlState) ?? {};
                return newState;
              },
              visibility: () => true,
              canCopy: true,
            },
          },
        ],
        [
          {
            name: 'adhoc_filters',
            override: {
              // validators: [adhocFilterValidator],
            },
          },
        ],
        [
          {
            name: 'order_by_cols',
            config: {
              type: 'SelectControl',
              label: t('Ordering'),
              description: t('Order results by selected columns'),
              multi: true,
              default: [],
              mapStateToProps: ({ datasource }) => ({
                choices: columnChoices(datasource),
              }),
              visibility: isRawMode,
            },
          },
        ],
        [
          {
            name: 'timeseries_limit_metric',
            override: {
              visibility: isAggMode,
            },
          },
        ],
        [
          {
            name: 'row_limit',
            override: {
              default: 100,
            },
          },
        ],
        [
          {
            name: 'order_desc',
            config: {
              type: 'CheckboxControl',
              label: t('Sort descending'),
              default: true,
              description: t('Whether to sort descending or ascending'),
              visibility: isAggMode,
            },
          },
        ],
        [
          isFeatureEnabled(FeatureFlag.DASHBOARD_CROSS_FILTERS)
            ? {
                name: 'table_filter',
                config: {
                  type: 'CheckboxControl',
                  label: t('Emit dashboard cross filters'),
                  default: false,
                  renderTrigger: true,
                  description: t('Emit dashboard cross filters.'),
                },
              }
            : null,
        ],
        [
          {
            name: 'column_state',
            config: {
              type: 'HiddenControl',
              hidden: true,
              label: t('Column state'),
              description: t('State of AG Grid columns'),
              dontRefreshOnChange: true,
            },
          },
        ],
      ],
    },
  ],
  // override controls that are inherited by the default configuration
  controlOverrides: {
    series: {
      validators: [validateNonEmpty],
      clearable: false,
    },
    viz_type: {
      default: 'cccs_grid',
    },
    time_range: {
      default: t('Last day'),
    },
  },
};

config.controlPanelSections.push({
  label: t('Options'),
  expanded: true,
  controlSetRows: [
    [
      {
        name: 'include_search',
        config: {
          type: 'CheckboxControl',
          label: t('Search box'),
          renderTrigger: true,
          default: false,
          description: t('Whether to include a client-side search box'),
        },
      },
    ],
    [
      {
        name: 'enable_grouping',
        config: {
          type: 'CheckboxControl',
          label: t('Row grouping'),
          renderTrigger: true,
          default: false,
          description: t(
            'Whether to enable row grouping (this will only take affect after a save)',
          ),
        },
      },
    ],
    [
      {
        name: 'enable_pivot',
        config: {
          type: 'CheckboxControl',
          label: t('Enable Pivot'),
          renderTrigger: true,
          default: true,
          description: t(
            'Whether to enable pivot table functionality (this will only take affect after a save)',
          ),
        },
      },
    ],
    [
      {
        name: 'page_length',
        config: {
          type: 'SelectControl',
          freeForm: true,
          renderTrigger: true,
          label: t('Page length'),
          default: 0,
          choices: PAGE_SIZE_OPTIONS,
          description: t('Rows per page, 0 means no pagination'),
          validators: [legacyValidateInteger],
        },
      },
    ],
  ],
});

export default config;
