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
  createSmartDateFormatter,
  getTimeFormatterRegistry,
  NumberFormats,
  SMART_DATE_ID,
} from '@superset-ui/core';
import {
  getPercentFormatter,
  getXAxisFormatter,
} from '../../src/utils/formatters';

// Register the smart date formatter so tests use real formatting logic
beforeAll(() => {
  getTimeFormatterRegistry().registerValue(
    SMART_DATE_ID,
    createSmartDateFormatter(),
  );
});

test('getXAxisFormatter should format a year-boundary date as a four-digit year', () => {
  const formatter = getXAxisFormatter(SMART_DATE_ID);
  expect(formatter(new Date('2023-01-01T00:00:00Z'))).toBe('2023');
});

test('getXAxisFormatter should use smart date when no format is specified', () => {
  const formatter = getXAxisFormatter();
  expect(formatter(new Date('2023-01-01T00:00:00Z'))).toBe('2023');
});

test('getXAxisFormatter should format numeric epoch input the same as Date input', () => {
  const formatter = getXAxisFormatter(SMART_DATE_ID);
  const epoch = new Date('2023-01-01T00:00:00Z').getTime();
  expect(formatter(epoch)).toBe('2023');
});

test('getXAxisFormatter with Year grain should floor sub-grain noise to year boundary', () => {
  const formatter = getXAxisFormatter(SMART_DATE_ID, 'P1Y');
  // ECharts adds padding to axis extents for bar charts, introducing
  // seconds-level noise (e.g., 24s past the year boundary).
  // Without grain-aware flooring, the smart date formatter detects
  // the non-zero seconds and produces ":24s" instead of "2023".
  expect(formatter(new Date('2023-01-01T00:00:24.862Z'))).toBe('2023');
  expect(formatter(new Date('2023-01-01T00:00:24.862Z').getTime())).toBe(
    '2023',
  );
});

test('getXAxisFormatter with Month grain should floor to month boundary', () => {
  const formatter = getXAxisFormatter(SMART_DATE_ID, 'P1M');
  // Noise at the day/hour level should be floored to the month start
  expect(formatter(new Date('2023-06-01T00:05:24.862Z'))).toBe('June');
});

test('getXAxisFormatter with Day grain should floor to day boundary', () => {
  const formatter = getXAxisFormatter(SMART_DATE_ID, 'P1D');
  expect(formatter(new Date('2023-06-15T00:02:30.000Z'))).toBe('Thu 15');
});

test('getXAxisFormatter without grain should floor to nearest second', () => {
  const formatter = getXAxisFormatter(SMART_DATE_ID);
  // Sub-second noise is still floored (backward compatible)
  expect(formatter(new Date('2023-01-01T00:00:00.862Z'))).toBe('2023');
});

test('getXAxisFormatter should handle extra ECharts callback args without breaking', () => {
  const formatter = getXAxisFormatter(SMART_DATE_ID);
  const epoch = new Date('2023-01-01T00:00:00Z').getTime();
  // ECharts calls formatter(value, index, {level}) — extra args must not throw
  expect((formatter as Function)(epoch, 0, { level: 0 })).toBe('2023');
});

test('getXAxisFormatter should return a time formatter for explicit time formats', () => {
  const formatter = getXAxisFormatter('%Y-%m-%d');
  expect(formatter).toBeDefined();
  const date = new Date('2023-06-15T00:00:00Z');
  expect(formatter(date)).toBe('2023-06-15');
});

describe('getPercentFormatter', () => {
  const value = 0.6;
  test('should format as percent if no format is specified', () => {
    expect(getPercentFormatter().format(value)).toEqual('60%');
  });
  test('should format as percent if SMART_NUMBER is specified', () => {
    expect(
      getPercentFormatter(NumberFormats.SMART_NUMBER).format(value),
    ).toEqual('60%');
  });
  test('should format using a provided format', () => {
    expect(
      getPercentFormatter(NumberFormats.PERCENT_2_POINT).format(value),
    ).toEqual('60.00%');
  });
});
