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
import { SortSeriesType } from '@superset-ui/chart-controls';
import {
  AxisType,
  DataRecord,
  GenericDataType,
  getNumberFormatter,
  getTimeFormatter,
  supersetTheme as theme,
} from '@superset-ui/core';
import {
  calculateLowerLogTick,
  dedupSeries,
  extractGroupbyLabel,
  extractSeries,
  extractShowValueIndexes,
  extractTooltipKeys,
  formatSeriesName,
  getAxisType,
  getChartPadding,
  getLegendProps,
  getOverMaxHiddenFormatter,
  getMinAndMaxFromBounds,
  sanitizeHtml,
  sortAndFilterSeries,
  sortRows,
  getTimeCompareStackId,
} from '../../src/utils/series';
import {
  EchartsTimeseriesSeriesType,
  LegendOrientation,
  LegendType,
} from '../../src/types';
import { defaultLegendPadding } from '../../src/defaults';
import { NULL_STRING } from '../../src/constants';

const expectedThemeProps = {
  selector: ['all', 'inverse'],
  selected: undefined,
  selectorLabel: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSizeSM,
    color: theme.colorText,
    borderColor: theme.colorBorder,
  },
};

const sortData: DataRecord[] = [
  { my_x_axis: 'abc', x: 1, y: 0, z: 2 },
  { my_x_axis: 'foo', x: null, y: 10, z: 5 },
  { my_x_axis: null, x: 4, y: 3, z: 7 },
];

const sortDataWithNumbers: DataRecord[] = [
  {
    my_x_axis: 'my_axis',
    '9. September': 6,
    6: 1,
    '11. November': 8,
    8: 2,
    '10. October': 1,
    10: 4,
    '3. March': 2,
    '8. August': 6,
    2: 1,
    12: 3,
    9: 1,
    '1. January': 1,
    '4. April': 12,
    '2. February': 9,
    5: 4,
    3: 1,
    11: 2,
    '12. December': 4,
    1: 7,
    '6. June': 1,
    4: 5,
    7: 2,
    c: 0,
    '7. July': 2,
    d: 0,
    '5. May': 4,
    a: 1,
  },
];

const totalStackedValues = [3, 15, 14];

test('sortRows by name ascending', () => {
  expect(
    sortRows(
      sortData,
      totalStackedValues,
      'my_x_axis',
      SortSeriesType.Name,
      true,
    ),
  ).toEqual([
    { row: { my_x_axis: 'abc', x: 1, y: 0, z: 2 }, totalStackedValue: 3 },
    { row: { my_x_axis: 'foo', x: null, y: 10, z: 5 }, totalStackedValue: 15 },
    { row: { my_x_axis: null, x: 4, y: 3, z: 7 }, totalStackedValue: 14 },
  ]);
});

test('sortRows by name descending', () => {
  expect(
    sortRows(
      sortData,
      totalStackedValues,
      'my_x_axis',
      SortSeriesType.Name,
      false,
    ),
  ).toEqual([
    { row: { my_x_axis: null, x: 4, y: 3, z: 7 }, totalStackedValue: 14 },
    { row: { my_x_axis: 'foo', x: null, y: 10, z: 5 }, totalStackedValue: 15 },
    { row: { my_x_axis: 'abc', x: 1, y: 0, z: 2 }, totalStackedValue: 3 },
  ]);
});

test('sortRows by sum ascending', () => {
  expect(
    sortRows(
      sortData,
      totalStackedValues,
      'my_x_axis',
      SortSeriesType.Sum,
      true,
    ),
  ).toEqual([
    { row: { my_x_axis: 'abc', x: 1, y: 0, z: 2 }, totalStackedValue: 3 },
    { row: { my_x_axis: null, x: 4, y: 3, z: 7 }, totalStackedValue: 14 },
    { row: { my_x_axis: 'foo', x: null, y: 10, z: 5 }, totalStackedValue: 15 },
  ]);
});

test('sortRows by sum descending', () => {
  expect(
    sortRows(
      sortData,
      totalStackedValues,
      'my_x_axis',
      SortSeriesType.Sum,
      false,
    ),
  ).toEqual([
    { row: { my_x_axis: 'foo', x: null, y: 10, z: 5 }, totalStackedValue: 15 },
    { row: { my_x_axis: null, x: 4, y: 3, z: 7 }, totalStackedValue: 14 },
    { row: { my_x_axis: 'abc', x: 1, y: 0, z: 2 }, totalStackedValue: 3 },
  ]);
});

test('sortRows by avg ascending', () => {
  expect(
    sortRows(
      sortData,
      totalStackedValues,
      'my_x_axis',
      SortSeriesType.Avg,
      true,
    ),
  ).toEqual([
    { row: { my_x_axis: 'abc', x: 1, y: 0, z: 2 }, totalStackedValue: 3 },
    { row: { my_x_axis: null, x: 4, y: 3, z: 7 }, totalStackedValue: 14 },
    { row: { my_x_axis: 'foo', x: null, y: 10, z: 5 }, totalStackedValue: 15 },
  ]);
});

test('sortRows by avg descending', () => {
  expect(
    sortRows(
      sortData,
      totalStackedValues,
      'my_x_axis',
      SortSeriesType.Avg,
      false,
    ),
  ).toEqual([
    { row: { my_x_axis: 'foo', x: null, y: 10, z: 5 }, totalStackedValue: 15 },
    { row: { my_x_axis: null, x: 4, y: 3, z: 7 }, totalStackedValue: 14 },
    { row: { my_x_axis: 'abc', x: 1, y: 0, z: 2 }, totalStackedValue: 3 },
  ]);
});

test('sortRows by min ascending', () => {
  expect(
    sortRows(
      sortData,
      totalStackedValues,
      'my_x_axis',
      SortSeriesType.Min,
      true,
    ),
  ).toEqual([
    { row: { my_x_axis: 'abc', x: 1, y: 0, z: 2 }, totalStackedValue: 3 },
    { row: { my_x_axis: null, x: 4, y: 3, z: 7 }, totalStackedValue: 14 },
    { row: { my_x_axis: 'foo', x: null, y: 10, z: 5 }, totalStackedValue: 15 },
  ]);
});

test('sortRows by min descending', () => {
  expect(
    sortRows(
      sortData,
      totalStackedValues,
      'my_x_axis',
      SortSeriesType.Min,
      false,
    ),
  ).toEqual([
    { row: { my_x_axis: 'foo', x: null, y: 10, z: 5 }, totalStackedValue: 15 },
    { row: { my_x_axis: null, x: 4, y: 3, z: 7 }, totalStackedValue: 14 },
    { row: { my_x_axis: 'abc', x: 1, y: 0, z: 2 }, totalStackedValue: 3 },
  ]);
});

test('sortRows by max ascending', () => {
  expect(
    sortRows(
      sortData,
      totalStackedValues,
      'my_x_axis',
      SortSeriesType.Min,
      true,
    ),
  ).toEqual([
    { row: { my_x_axis: 'abc', x: 1, y: 0, z: 2 }, totalStackedValue: 3 },
    { row: { my_x_axis: null, x: 4, y: 3, z: 7 }, totalStackedValue: 14 },
    { row: { my_x_axis: 'foo', x: null, y: 10, z: 5 }, totalStackedValue: 15 },
  ]);
});

test('sortRows by max descending', () => {
  expect(
    sortRows(
      sortData,
      totalStackedValues,
      'my_x_axis',
      SortSeriesType.Min,
      false,
    ),
  ).toEqual([
    { row: { my_x_axis: 'foo', x: null, y: 10, z: 5 }, totalStackedValue: 15 },
    { row: { my_x_axis: null, x: 4, y: 3, z: 7 }, totalStackedValue: 14 },
    { row: { my_x_axis: 'abc', x: 1, y: 0, z: 2 }, totalStackedValue: 3 },
  ]);
});

test('sortAndFilterSeries by min ascending', () => {
  expect(
    sortAndFilterSeries(sortData, 'my_x_axis', [], SortSeriesType.Min, true),
  ).toEqual(['y', 'x', 'z']);
});

test('sortAndFilterSeries by min descending', () => {
  expect(
    sortAndFilterSeries(sortData, 'my_x_axis', [], SortSeriesType.Min, false),
  ).toEqual(['z', 'x', 'y']);
});

test('sortAndFilterSeries by max ascending', () => {
  expect(
    sortAndFilterSeries(sortData, 'my_x_axis', [], SortSeriesType.Max, true),
  ).toEqual(['x', 'z', 'y']);
});

test('sortAndFilterSeries by max descending', () => {
  expect(
    sortAndFilterSeries(sortData, 'my_x_axis', [], SortSeriesType.Max, false),
  ).toEqual(['y', 'z', 'x']);
});

test('sortAndFilterSeries by avg ascending', () => {
  expect(
    sortAndFilterSeries(sortData, 'my_x_axis', [], SortSeriesType.Avg, true),
  ).toEqual(['x', 'y', 'z']);
});

test('sortAndFilterSeries by avg descending', () => {
  expect(
    sortAndFilterSeries(sortData, 'my_x_axis', [], SortSeriesType.Avg, false),
  ).toEqual(['z', 'y', 'x']);
});

test('sortAndFilterSeries by sum ascending', () => {
  expect(
    sortAndFilterSeries(sortData, 'my_x_axis', [], SortSeriesType.Sum, true),
  ).toEqual(['x', 'y', 'z']);
});

test('sortAndFilterSeries by sum descending', () => {
  expect(
    sortAndFilterSeries(sortData, 'my_x_axis', [], SortSeriesType.Sum, false),
  ).toEqual(['z', 'y', 'x']);
});

test('sortAndFilterSeries by name ascending', () => {
  expect(
    sortAndFilterSeries(sortData, 'my_x_axis', [], SortSeriesType.Name, true),
  ).toEqual(['x', 'y', 'z']);
});

test('sortAndFilterSeries by name descending', () => {
  expect(
    sortAndFilterSeries(sortData, 'my_x_axis', [], SortSeriesType.Name, false),
  ).toEqual(['z', 'y', 'x']);
});
test('sortAndFilterSeries by name with numbers asc', () => {
  expect(
    sortAndFilterSeries(
      sortDataWithNumbers,
      'my_x_axis',
      [],
      SortSeriesType.Name,
      true,
    ),
  ).toEqual([
    '1',
    '1. January',
    '2',
    '2. February',
    '3',
    '3. March',
    '4',
    '4. April',
    '5',
    '5. May',
    '6',
    '6. June',
    '7',
    '7. July',
    '8',
    '8. August',
    '9',
    '9. September',
    '10',
    '10. October',
    '11',
    '11. November',
    '12',
    '12. December',
    'a',
    'c',
    'd',
  ]);
});
test('sortAndFilterSeries by name with numbers desc', () => {
  expect(
    sortAndFilterSeries(
      sortDataWithNumbers,
      'my_x_axis',
      [],
      SortSeriesType.Name,
      false,
    ),
  ).toEqual([
    'd',
    'c',
    'a',
    '12. December',
    '12',
    '11. November',
    '11',
    '10. October',
    '10',
    '9. September',
    '9',
    '8. August',
    '8',
    '7. July',
    '7',
    '6. June',
    '6',
    '5. May',
    '5',
    '4. April',
    '4',
    '3. March',
    '3',
    '2. February',
    '2',
    '1. January',
    '1',
  ]);
});

describe('extractSeries', () => {
  it('should generate a valid ECharts timeseries series object', () => {
    const data = [
      {
        __timestamp: '2000-01-01',
        Hulk: null,
        abc: 2,
      },
      {
        __timestamp: '2000-02-01',
        Hulk: 2,
        abc: 10,
      },
      {
        __timestamp: '2000-03-01',
        Hulk: 1,
        abc: 5,
      },
    ];
    const totalStackedValues = [2, 12, 6];
    expect(extractSeries(data, { totalStackedValues })).toEqual([
      [
        {
          id: 'Hulk',
          name: 'Hulk',
          data: [
            ['2000-01-01', null],
            ['2000-02-01', 2],
            ['2000-03-01', 1],
          ],
        },
        {
          id: 'abc',
          name: 'abc',
          data: [
            ['2000-01-01', 2],
            ['2000-02-01', 10],
            ['2000-03-01', 5],
          ],
        },
      ],
      totalStackedValues,
      1,
    ]);
  });

  it('should remove rows that have a null x-value', () => {
    const data = [
      {
        x: 1,
        Hulk: null,
        abc: 2,
      },
      {
        x: null,
        Hulk: 2,
        abc: 10,
      },
      {
        x: 2,
        Hulk: 1,
        abc: 5,
      },
    ];
    const totalStackedValues = [3, 12, 8];
    expect(
      extractSeries(data, {
        totalStackedValues,
        xAxis: 'x',
        removeNulls: true,
      }),
    ).toEqual([
      [
        {
          id: 'Hulk',
          name: 'Hulk',
          data: [[2, 1]],
        },
        {
          id: 'abc',
          name: 'abc',
          data: [
            [1, 2],
            [2, 5],
          ],
        },
      ],
      totalStackedValues,
      1,
    ]);
  });

  it('should do missing value imputation', () => {
    const data = [
      {
        __timestamp: '2000-01-01',
        abc: null,
      },
      {
        __timestamp: '2000-02-01',
        abc: null,
      },
      {
        __timestamp: '2000-03-01',
        abc: 1,
      },
      {
        __timestamp: '2000-04-01',
        abc: null,
      },
      {
        __timestamp: '2000-05-01',
        abc: null,
      },
      {
        __timestamp: '2000-06-01',
        abc: null,
      },
      {
        __timestamp: '2000-07-01',
        abc: 2,
      },
      {
        __timestamp: '2000-08-01',
        abc: 3,
      },
      {
        __timestamp: '2000-09-01',
        abc: null,
      },
      {
        __timestamp: '2000-10-01',
        abc: null,
      },
    ];
    const totalStackedValues = [0, 0, 1, 0, 0, 0, 2, 3, 0, 0];
    expect(
      extractSeries(data, { totalStackedValues, fillNeighborValue: 0 }),
    ).toEqual([
      [
        {
          id: 'abc',
          name: 'abc',
          data: [
            ['2000-01-01', null],
            ['2000-02-01', 0],
            ['2000-03-01', 1],
            ['2000-04-01', 0],
            ['2000-05-01', null],
            ['2000-06-01', 0],
            ['2000-07-01', 2],
            ['2000-08-01', 3],
            ['2000-09-01', 0],
            ['2000-10-01', null],
          ],
        },
      ],
      totalStackedValues,
      1,
    ]);
  });
});

describe('extractGroupbyLabel', () => {
  it('should join together multiple groupby labels', () => {
    expect(
      extractGroupbyLabel({
        datum: { a: 'abc', b: 'qwerty' },
        groupby: ['a', 'b'],
      }),
    ).toEqual('abc, qwerty');
  });

  it('should handle a single groupby', () => {
    expect(
      extractGroupbyLabel({ datum: { xyz: 'qqq' }, groupby: ['xyz'] }),
    ).toEqual('qqq');
  });

  it('should handle mixed types', () => {
    expect(
      extractGroupbyLabel({
        datum: { strcol: 'abc', intcol: 123, floatcol: 0.123, boolcol: true },
        groupby: ['strcol', 'intcol', 'floatcol', 'boolcol'],
      }),
    ).toEqual('abc, 123, 0.123, true');
  });

  it('should handle null and undefined groupby', () => {
    expect(
      extractGroupbyLabel({
        datum: { strcol: 'abc', intcol: 123, floatcol: 0.123, boolcol: true },
        groupby: null,
      }),
    ).toEqual('');
    expect(extractGroupbyLabel({})).toEqual('');
  });
});

describe('extractShowValueIndexes', () => {
  it('should return the latest index for stack', () => {
    expect(
      extractShowValueIndexes(
        [
          {
            id: 'abc',
            name: 'abc',
            data: [
              ['2000-01-01', null],
              ['2000-02-01', 0],
              ['2000-03-01', 1],
              ['2000-04-01', 0],
              ['2000-05-01', null],
              ['2000-06-01', 0],
              ['2000-07-01', 2],
              ['2000-08-01', 3],
              ['2000-09-01', null],
              ['2000-10-01', null],
            ],
          },
          {
            id: 'def',
            name: 'def',
            data: [
              ['2000-01-01', null],
              ['2000-02-01', 0],
              ['2000-03-01', null],
              ['2000-04-01', 0],
              ['2000-05-01', null],
              ['2000-06-01', 0],
              ['2000-07-01', 2],
              ['2000-08-01', 3],
              ['2000-09-01', null],
              ['2000-10-01', 0],
            ],
          },
          {
            id: 'def',
            name: 'def',
            data: [
              ['2000-01-01', null],
              ['2000-02-01', null],
              ['2000-03-01', null],
              ['2000-04-01', null],
              ['2000-05-01', null],
              ['2000-06-01', 3],
              ['2000-07-01', null],
              ['2000-08-01', null],
              ['2000-09-01', null],
              ['2000-10-01', null],
            ],
          },
        ],
        { stack: true, onlyTotal: false, isHorizontal: false },
      ),
    ).toEqual([undefined, 1, 0, 1, undefined, 2, 1, 1, undefined, 1]);
  });

  it('should handle the negative numbers for total only', () => {
    expect(
      extractShowValueIndexes(
        [
          {
            id: 'abc',
            name: 'abc',
            data: [
              ['2000-01-01', null],
              ['2000-02-01', 0],
              ['2000-03-01', -1],
              ['2000-04-01', 0],
              ['2000-05-01', null],
              ['2000-06-01', 0],
              ['2000-07-01', -2],
              ['2000-08-01', -3],
              ['2000-09-01', null],
              ['2000-10-01', null],
            ],
          },
          {
            id: 'def',
            name: 'def',
            data: [
              ['2000-01-01', null],
              ['2000-02-01', 0],
              ['2000-03-01', null],
              ['2000-04-01', 0],
              ['2000-05-01', null],
              ['2000-06-01', 0],
              ['2000-07-01', 2],
              ['2000-08-01', -3],
              ['2000-09-01', null],
              ['2000-10-01', 0],
            ],
          },
          {
            id: 'def',
            name: 'def',
            data: [
              ['2000-01-01', null],
              ['2000-02-01', 0],
              ['2000-03-01', null],
              ['2000-04-01', 1],
              ['2000-05-01', null],
              ['2000-06-01', 0],
              ['2000-07-01', -2],
              ['2000-08-01', 3],
              ['2000-09-01', null],
              ['2000-10-01', 0],
            ],
          },
        ],
        { stack: true, onlyTotal: true, isHorizontal: false },
      ),
    ).toEqual([undefined, 1, 0, 2, undefined, 1, 1, 2, undefined, 1]);
  });
});

describe('formatSeriesName', () => {
  const numberFormatter = getNumberFormatter();
  const timeFormatter = getTimeFormatter();
  it('should handle missing values properly', () => {
    expect(formatSeriesName(undefined)).toEqual('<NULL>');
    expect(formatSeriesName(null)).toEqual('<NULL>');
  });

  it('should handle string values properly', () => {
    expect(formatSeriesName('abc XYZ!')).toEqual('abc XYZ!');
  });

  it('should handle boolean values properly', () => {
    expect(formatSeriesName(true)).toEqual('true');
  });

  it('should use default formatting for numeric values without formatter', () => {
    expect(formatSeriesName(12345678.9)).toEqual('12345678.9');
  });

  it('should use numberFormatter for numeric values when formatter is provided', () => {
    expect(formatSeriesName(12345678.9, { numberFormatter })).toEqual('12.3M');
  });

  it('should use default formatting for date values without formatter', () => {
    expect(formatSeriesName(new Date('2020-09-11'))).toEqual(
      '2020-09-11T00:00:00.000Z',
    );
  });

  it('should use timeFormatter for date values when formatter is provided', () => {
    expect(formatSeriesName(new Date('2020-09-11'), { timeFormatter })).toEqual(
      '2020-09-11 00:00:00',
    );
  });

  it('should normalize non-UTC string based timestamp', () => {
    const annualTimeFormatter = getTimeFormatter('%Y');
    expect(
      formatSeriesName('1995-01-01 00:00:00.000000', {
        timeFormatter: annualTimeFormatter,
        coltype: GenericDataType.Temporal,
      }),
    ).toEqual('1995');
  });
});

describe('getLegendProps', () => {
  it('should return the correct props for scroll type with top orientation without zoom', () => {
    expect(
      getLegendProps(
        LegendType.Scroll,
        LegendOrientation.Top,
        true,
        theme,
        false,
      ),
    ).toEqual({
      show: true,
      top: 0,
      right: 0,
      orient: 'horizontal',
      type: 'scroll',
      ...expectedThemeProps,
    });
  });

  it('should return the correct props for scroll type with top orientation with zoom', () => {
    expect(
      getLegendProps(
        LegendType.Scroll,
        LegendOrientation.Top,
        true,
        theme,
        true,
      ),
    ).toEqual({
      show: true,
      top: 0,
      right: 55,
      orient: 'horizontal',
      type: 'scroll',
      ...expectedThemeProps,
    });
  });

  it('should return the correct props for plain type with left orientation', () => {
    expect(
      getLegendProps(LegendType.Plain, LegendOrientation.Left, true, theme),
    ).toEqual({
      show: true,
      left: 0,
      orient: 'vertical',
      type: 'plain',
      ...expectedThemeProps,
    });
  });

  it('should return the correct props for plain type with right orientation without zoom', () => {
    expect(
      getLegendProps(
        LegendType.Plain,
        LegendOrientation.Right,
        false,
        theme,
        false,
      ),
    ).toEqual({
      show: false,
      right: 0,
      top: 0,
      orient: 'vertical',
      type: 'plain',
      ...expectedThemeProps,
    });
  });

  it('should return the correct props for plain type with right orientation with zoom', () => {
    expect(
      getLegendProps(
        LegendType.Plain,
        LegendOrientation.Right,
        false,
        theme,
        true,
      ),
    ).toEqual({
      show: false,
      right: 0,
      top: 30,
      orient: 'vertical',
      type: 'plain',
      ...expectedThemeProps,
    });
  });

  it('should return the correct props for plain type with bottom orientation', () => {
    expect(
      getLegendProps(LegendType.Plain, LegendOrientation.Bottom, false, theme),
    ).toEqual({
      show: false,
      bottom: 0,
      orient: 'horizontal',
      type: 'plain',
      ...expectedThemeProps,
    });
  });
});

describe('getChartPadding', () => {
  it('should handle top default', () => {
    expect(getChartPadding(true, LegendOrientation.Top)).toEqual({
      bottom: 0,
      left: 0,
      right: 0,
      top: defaultLegendPadding[LegendOrientation.Top],
    });
  });

  it('should handle left default', () => {
    expect(getChartPadding(true, LegendOrientation.Left)).toEqual({
      bottom: 0,
      left: defaultLegendPadding[LegendOrientation.Left],
      right: 0,
      top: 0,
    });
  });

  it('should return the default padding when show is false', () => {
    expect(
      getChartPadding(false, LegendOrientation.Left, 100, {
        top: 10,
        bottom: 20,
        left: 30,
        right: 40,
      }),
    ).toEqual({
      bottom: 20,
      left: 30,
      right: 40,
      top: 10,
    });
  });

  it('should return the correct padding for left orientation', () => {
    expect(getChartPadding(true, LegendOrientation.Left, 100)).toEqual({
      bottom: 0,
      left: 100,
      right: 0,
      top: 0,
    });
    expect(
      getChartPadding(true, LegendOrientation.Left, 100, undefined, true),
    ).toEqual({
      bottom: 100,
      left: 0,
      right: 0,
      top: 0,
    });
  });

  it('should return the correct padding for right orientation', () => {
    expect(getChartPadding(true, LegendOrientation.Right, 50)).toEqual({
      bottom: 0,
      left: 0,
      right: 50,
      top: 0,
    });
    expect(
      getChartPadding(true, LegendOrientation.Right, 50, undefined, true),
    ).toEqual({
      bottom: 0,
      left: 0,
      right: 50,
      top: 0,
    });
  });

  it('should return the correct padding for top orientation', () => {
    expect(getChartPadding(true, LegendOrientation.Top, 20)).toEqual({
      bottom: 0,
      left: 0,
      right: 0,
      top: 20,
    });
    expect(
      getChartPadding(true, LegendOrientation.Top, 20, undefined, true),
    ).toEqual({
      bottom: 0,
      left: 0,
      right: 0,
      top: 20,
    });
  });

  it('should return the correct padding for bottom orientation', () => {
    expect(getChartPadding(true, LegendOrientation.Bottom, 10)).toEqual({
      bottom: 10,
      left: 0,
      right: 0,
      top: 0,
    });
    expect(
      getChartPadding(true, LegendOrientation.Bottom, 10, undefined, true),
    ).toEqual({
      bottom: 0,
      left: 10,
      right: 0,
      top: 0,
    });
  });
});

describe('dedupSeries', () => {
  it('should deduplicate ids in series', () => {
    expect(
      dedupSeries([
        {
          id: 'foo',
        },
        {
          id: 'bar',
        },
        {
          id: 'foo',
        },
        {
          id: 'foo',
        },
      ]),
    ).toEqual([
      { id: 'foo' },
      { id: 'bar' },
      { id: 'foo (1)' },
      { id: 'foo (2)' },
    ]);
  });
});

describe('sanitizeHtml', () => {
  it('should remove html tags from series name', () => {
    expect(sanitizeHtml(NULL_STRING)).toEqual('&lt;NULL&gt;');
  });
});

describe('getOverMaxHiddenFormatter', () => {
  it('should hide value if greater than max', () => {
    const formatter = getOverMaxHiddenFormatter({ max: 81000 });
    expect(formatter.format(84500)).toEqual('');
  });
  it('should show value if less or equal than max', () => {
    const formatter = getOverMaxHiddenFormatter({ max: 81000 });
    expect(formatter.format(81000)).toEqual('81000');
    expect(formatter.format(50000)).toEqual('50000');
  });
});

test('calculateLowerLogTick', () => {
  expect(calculateLowerLogTick(1000000)).toEqual(1000000);
  expect(calculateLowerLogTick(456)).toEqual(100);
  expect(calculateLowerLogTick(100)).toEqual(100);
  expect(calculateLowerLogTick(99)).toEqual(10);
  expect(calculateLowerLogTick(2)).toEqual(1);
  expect(calculateLowerLogTick(0.005)).toEqual(0.001);
});

test('getAxisType without forced categorical', () => {
  expect(getAxisType(false, false, GenericDataType.Temporal)).toEqual(
    AxisType.Time,
  );
  expect(getAxisType(false, false, GenericDataType.Numeric)).toEqual(
    AxisType.Value,
  );
  expect(getAxisType(true, false, GenericDataType.Numeric)).toEqual(
    AxisType.Category,
  );
  expect(getAxisType(false, false, GenericDataType.Boolean)).toEqual(
    AxisType.Category,
  );
  expect(getAxisType(false, false, GenericDataType.String)).toEqual(
    AxisType.Category,
  );
});

test('getAxisType with forced categorical', () => {
  expect(getAxisType(false, true, GenericDataType.Numeric)).toEqual(
    AxisType.Category,
  );
});

test('getMinAndMaxFromBounds returns empty object when not truncating', () => {
  expect(
    getMinAndMaxFromBounds(
      AxisType.Value,
      false,
      10,
      100,
      EchartsTimeseriesSeriesType.Bar,
    ),
  ).toEqual({});
});

test('getMinAndMaxFromBounds returns empty object for categorical axis', () => {
  expect(
    getMinAndMaxFromBounds(
      AxisType.Category,
      false,
      10,
      100,
      EchartsTimeseriesSeriesType.Bar,
    ),
  ).toEqual({});
});

test('getMinAndMaxFromBounds returns empty object for time axis', () => {
  expect(
    getMinAndMaxFromBounds(
      AxisType.Time,
      false,
      10,
      100,
      EchartsTimeseriesSeriesType.Bar,
    ),
  ).toEqual({});
});

test('getMinAndMaxFromBounds returns dataMin/dataMax for non-bar charts', () => {
  expect(
    getMinAndMaxFromBounds(
      AxisType.Value,
      true,
      undefined,
      undefined,
      EchartsTimeseriesSeriesType.Line,
    ),
  ).toEqual({
    min: 'dataMin',
    max: 'dataMax',
  });
});

test('getMinAndMaxFromBounds returns bound without scale for non-bar charts', () => {
  expect(
    getMinAndMaxFromBounds(
      AxisType.Value,
      true,
      10,
      undefined,
      EchartsTimeseriesSeriesType.Line,
    ),
  ).toEqual({
    min: 10,
    max: 'dataMax',
  });
});

test('getMinAndMaxFromBounds returns scale when truncating without bounds', () => {
  expect(
    getMinAndMaxFromBounds(
      AxisType.Value,
      true,
      undefined,
      undefined,
      EchartsTimeseriesSeriesType.Bar,
    ),
  ).toEqual({ scale: true });
});

test('getMinAndMaxFromBounds returns automatic upper bound when truncating', () => {
  expect(
    getMinAndMaxFromBounds(
      AxisType.Value,
      true,
      10,
      undefined,
      EchartsTimeseriesSeriesType.Bar,
    ),
  ).toEqual({
    min: 10,
    scale: true,
  });
});

test('getMinAndMaxFromBounds returns automatic lower bound when truncating', () => {
  expect(
    getMinAndMaxFromBounds(
      AxisType.Value,
      true,
      undefined,
      100,
      EchartsTimeseriesSeriesType.Bar,
    ),
  ).toEqual({
    max: 100,
    scale: true,
  });
});

describe('getTimeCompareStackId', () => {
  it('returns the defaultId when timeCompare is empty', () => {
    const result = getTimeCompareStackId('default', []);
    expect(result).toEqual('default');
  });

  it('returns the defaultId when no value in timeCompare is included in name', () => {
    const result = getTimeCompareStackId(
      'default',
      ['compare1', 'compare2'],
      'test__name',
    );
    expect(result).toEqual('default');
  });

  it('returns the first value in timeCompare that is included in name', () => {
    const result = getTimeCompareStackId(
      'default',
      ['compare1', 'compare2'],
      'test__compare1',
    );
    expect(result).toEqual('compare1');
  });

  it('handles name being a number', () => {
    const result = getTimeCompareStackId('default', ['123', '456'], 123);
    expect(result).toEqual('123');
  });
});

const forecastValue = [
  {
    data: [0, 1],
    seriesId: 'foo',
  },
  {
    data: [0, 2],
    seriesId: 'bar',
  },
];

test('extractTooltipKeys with rich tooltip', () => {
  const result = extractTooltipKeys(forecastValue, 1, true, false);
  expect(result).toEqual(['foo', 'bar']);
});

test('extractTooltipKeys with rich tooltip and sorting by metrics', () => {
  const result = extractTooltipKeys(forecastValue, 1, true, true);
  expect(result).toEqual(['bar', 'foo']);
});

test('extractTooltipKeys with non-rich tooltip', () => {
  const result = extractTooltipKeys(forecastValue, 1, false, false);
  expect(result).toEqual(['foo']);
});
