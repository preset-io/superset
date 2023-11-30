import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlteredSliceTag, {
  alterForComparison,
  formatValueHandler,
} from 'src/components/AlteredSliceTag';
import { ThemeProvider, supersetTheme } from '@superset-ui/core';
import { defaultProps } from './AlteredSliceTagMocks';

const renderWithTheme = ui =>
  render(<ThemeProvider theme={supersetTheme}>{ui}</ThemeProvider>);

describe('AlteredSliceTag', () => {
  it('renders the "Altered" label', () => {
    renderWithTheme(<AlteredSliceTag {...defaultProps} />);

    const alteredLabel = screen.getByText('Altered');
    expect(alteredLabel).toBeInTheDocument();
  });

  it('opens the modal on click', () => {
    renderWithTheme(<AlteredSliceTag {...defaultProps} />);

    const alteredLabel = screen.getByText('Altered');
    userEvent.click(alteredLabel);

    const modalTitle = screen.getByText('Chart changes');
    expect(modalTitle).toBeInTheDocument();
  });

  it('displays the differences in the modal', () => {
    renderWithTheme(<AlteredSliceTag {...defaultProps} />);

    const alteredLabel = screen.getByText('Altered');
    userEvent.click(alteredLabel);

    const beforeValue = screen.getByText('1, 2, 3, 4');
    const afterValue = screen.getByText('a, b, c, d');
    expect(beforeValue).toBeInTheDocument();
    expect(afterValue).toBeInTheDocument();
  });

  it('does not render anything if there are no differences', () => {
    renderWithTheme(
      <AlteredSliceTag
        {...defaultProps}
        currentFormData={defaultProps.origFormData}
      />,
    );

    const alteredLabel = screen.queryByText('Altered');
    expect(alteredLabel).not.toBeInTheDocument();
  });
});

describe('alterForComparison', () => {
  it('returns null for undefined value', () => {
    const value = undefined;
    const result = alterForComparison(value);
    expect(result).toBeNull();
  });

  it('returns null for null value', () => {
    const value = null;
    const result = alterForComparison(value);
    expect(result).toBeNull();
  });

  it('returns null for empty string value', () => {
    const value = '';
    const result = alterForComparison(value);
    expect(result).toBeNull();
  });

  it('returns null for empty array value', () => {
    const value = [];
    const result = alterForComparison(value);
    expect(result).toBeNull();
  });

  it('returns null for empty object value', () => {
    const value = {};
    const result = alterForComparison(value);
    expect(result).toBeNull();
  });

  it('returns value for non-empty array', () => {
    const value = [1, 2, 3];
    const result = alterForComparison(value);
    expect(result).toEqual(value);
  });

  it('returns value for non-empty object', () => {
    const value = { key: 'value' };
    const result = alterForComparison(value);
    expect(result).toEqual(value);
  });
});

describe('formatValueHandler', () => {
  const controlsMap = {
    key1: { type: 'AdhocFilterControl', label: 'Label1' },
    key2: { type: 'BoundsControl', label: 'Label2' },
    key3: { type: 'CollectionControl', label: 'Label3' },
    key4: { type: 'MetricsControl', label: 'Label4' },
    key5: { type: 'OtherControl', label: 'Label5' },
  };

  it('formats AdhocFilterControl values correctly', () => {
    const value = {
      subject: 'subject',
      operator: 'operator',
      comparator: ['comp1', 'comp2'],
    };
    const result = formatValueHandler(value, 'key1', controlsMap);
    expect(result).toEqual('subject operator [comp1, comp2]');
  });

  it('formats BoundsControl values correctly', () => {
    const value = [1, 2];
    const result = formatValueHandler(value, 'key2', controlsMap);
    expect(result).toEqual('Min: 1, Max: 2');
  });

  it('formats CollectionControl values correctly', () => {
    const value = [{ a: 1 }, { b: 2 }];
    const result = formatValueHandler(value, 'key3', controlsMap);
    expect(result).toEqual(
      `${JSON.stringify(value[0])}, ${JSON.stringify(value[1])}`,
    );
  });

  it('formats MetricsControl values correctly', () => {
    const value = [{ label: 'Metric1' }, { label: 'Metric2' }];
    const result = formatValueHandler(value, 'key4', controlsMap);
    expect(result).toEqual('Metric1, Metric2');
  });

  it('formats boolean values correctly', () => {
    const value = true;
    const result = formatValueHandler(value, 'key5', controlsMap);
    expect(result).toEqual('true');
  });

  it('formats array values correctly', () => {
    const value = [{ label: 'Label1' }, { label: 'Label2' }];
    const result = formatValueHandler(value, 'key5', controlsMap);
    expect(result).toEqual('Label1, Label2');
  });

  it('formats string values correctly', () => {
    const value = 'test';
    const result = formatValueHandler(value, 'key5', controlsMap);
    expect(result).toEqual('test');
  });

  it('formats number values correctly', () => {
    const value = 123;
    const result = formatValueHandler(value, 'key5', controlsMap);
    expect(result).toEqual(123);
  });

  it('formats other values correctly', () => {
    const value = { a: 1, b: 2 };
    const result = formatValueHandler(value, 'key5', controlsMap);
    expect(result).toEqual(JSON.stringify(value));
  });
});
