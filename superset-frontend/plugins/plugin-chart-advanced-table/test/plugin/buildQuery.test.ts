import buildQuery from '../../src/plugin/buildQuery';
import { AdvancedTableQueryFormData } from '../../src/types';

describe('AdvancedTable buildQuery', () => {
  const formData: AdvancedTableQueryFormData = {
    datasource: '5__table',
    granularity_sqla: 'ds',
    series: 'foo',
    emitFilter: false,
    include_search: false,
    page_length: 0,
    enable_grouping: false,
    enable_pivot: false,
    viz_type: 'my_chart',
    column_state: [],
  };

  it('should build groupby with series in form data', () => {
    const queryContext = buildQuery(formData);
    const [query] = queryContext.queries;
    expect(query.groupby).toEqual(['foo']);
  });
});
