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
import React, { useState, useEffect, useCallback } from 'react';
import rison from 'rison';
import PropTypes from 'prop-types';
import { CompactPicker } from 'react-color';
import Button from 'src/components/Button';
import {
  t,
  SupersetClient,
  getCategoricalSchemeRegistry,
  getChartMetadataRegistry,
  validateNonEmpty,
  isValidExpression,
  styled,
  getColumnLabel,
  withTheme,
} from '@superset-ui/core';
import SelectControl from 'src/explore/components/controls/SelectControl';
import TextControl from 'src/explore/components/controls/TextControl';
import CheckboxControl from 'src/explore/components/controls/CheckboxControl';
import PopoverSection from 'src/components/PopoverSection';
import ControlHeader from 'src/explore/components/ControlHeader';
import { EmptyStateSmall } from 'src/components/EmptyState';
import { FILTER_OPTIONS_LIMIT } from 'src/explore/constants';
import {
  ANNOTATION_SOURCE_TYPES,
  ANNOTATION_TYPES,
  ANNOTATION_TYPES_METADATA,
  DEFAULT_ANNOTATION_TYPE,
  requiresQuery,
  ANNOTATION_SOURCE_TYPES_METADATA,
} from './AnnotationTypes';

const AUTOMATIC_COLOR = '';

const propTypes = {
  name: PropTypes.string,
  annotationType: PropTypes.string,
  sourceType: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.string,
  style: PropTypes.string,
  width: PropTypes.number,
  showMarkers: PropTypes.bool,
  hideLine: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  overrides: PropTypes.object,
  show: PropTypes.bool,
  showLabel: PropTypes.bool,
  titleColumn: PropTypes.string,
  descriptionColumns: PropTypes.arrayOf(PropTypes.string),
  timeColumn: PropTypes.string,
  intervalEndColumn: PropTypes.string,
  vizType: PropTypes.string,

  error: PropTypes.string,
  colorScheme: PropTypes.string,

  addAnnotationLayer: PropTypes.func,
  removeAnnotationLayer: PropTypes.func,
  close: PropTypes.func,
};

const defaultProps = {
  name: '',
  annotationType: DEFAULT_ANNOTATION_TYPE,
  sourceType: '',
  color: AUTOMATIC_COLOR,
  opacity: '',
  style: 'solid',
  width: 1,
  showMarkers: false,
  hideLine: false,
  overrides: {},
  colorScheme: 'd3Category10',
  show: true,
  showLabel: false,
  titleColumn: '',
  descriptionColumns: [],
  timeColumn: '',
  intervalEndColumn: '',

  addAnnotationLayer: () => {},
  removeAnnotationLayer: () => {},
  close: () => {},
};

const NotFoundContentWrapper = styled.div`
  && > div:first-child {
    padding-left: 0;
    padding-right: 0;
  }
`;

const NotFoundContent = () => (
  <NotFoundContentWrapper>
    <EmptyStateSmall
      title={t('No annotation layers')}
      description={
        <span>
          {t('Add an annotation layer')}{' '}
          <a
            href="/annotationlayer/list"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('here')}
          </a>
          .
        </span>
      }
      image="empty.svg"
    />
  </NotFoundContentWrapper>
);

const AnnotationLayer = props => {
  const [annotationType, setAnnotationType] = useState(validAnnotationType);
  const [color, setColor] = useState(props.color || AUTOMATIC_COLOR);
  const [isNew, setIsNew] = useState(!name);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [valueOptions, setValueOptions] = useState([]);

  useEffect(() => {
    fetchOptions(annotationType, sourceType, isLoadingOptions);
  }, [annotationType, isLoadingOptions]);
  useEffect(() => {
    if (prevState.sourceType !== sourceType) {
      fetchOptions(annotationType, sourceType, true);
    }
  }, [annotationType]);
  const getSupportedSourceTypesHandler = useCallback(
    annotationType => {
      // Get vis types that can be source.
      const sources = getChartMetadataRegistry()
        .entries()
        .filter(({ value: chartMetadata }) =>
          chartMetadata.canBeAnnotationType(annotationType),
        )
        .map(({ key, value: chartMetadata }) => ({
          value: key,
          label: chartMetadata.name,
        }));
      // Prepend native source if applicable
      if (ANNOTATION_TYPES_METADATA[annotationType]?.supportNativeSource) {
        sources.unshift(ANNOTATION_SOURCE_TYPES_METADATA.NATIVE);
      }
      return sources;
    },
    [annotationType],
  );
  const isValidFormulaAnnotationHandler = useCallback(
    (expression, annotationType) => {
      if (annotationType === ANNOTATION_TYPES.FORMULA) {
        return isValidExpression(expression);
      }
      return true;
    },
    [annotationType],
  );
  const isValidFormHandler = useCallback(() => {
    const errors = [
      validateNonEmpty(name),
      validateNonEmpty(annotationType),
      validateNonEmpty(value),
    ];
    if (sourceType !== ANNOTATION_SOURCE_TYPES.NATIVE) {
      if (annotationType === ANNOTATION_TYPES.EVENT) {
        errors.push(validateNonEmpty(timeColumn));
      }
      if (annotationType === ANNOTATION_TYPES.INTERVAL) {
        errors.push(validateNonEmpty(timeColumn));
        errors.push(validateNonEmpty(intervalEndColumn));
      }
    }
    errors.push(!isValidFormulaAnnotationHandler(value, annotationType));
    return !errors.filter(x => x).length;
  }, [annotationType]);
  const handleAnnotationTypeHandler = useCallback(
    annotationType => {
      setAnnotationType(annotationType);
      setSourceType(null);
      setValue(null);
    },
    [annotationType],
  );
  const handleAnnotationSourceTypeHandler = useCallback(sourceType => {
    if (prevSourceType !== sourceType) {
      setSourceType(sourceType);
      setValue(null);
      setIsLoadingOptions(true);
    }
  }, []);
  const handleValueHandler = useCallback(value => {
    setValue(value);
    setDescriptionColumns([]);
    setIntervalEndColumn(null);
    setTimeColumn(null);
    setTitleColumn(null);
    setOverrides({ time_range: null });
  }, []);
  const fetchOptions = useMemo(() => {
    if (isLoadingOptions) {
      if (sourceType === ANNOTATION_SOURCE_TYPES.NATIVE) {
        const queryParams = rison.encode({
          page: 0,
          page_size: FILTER_OPTIONS_LIMIT,
        });
        SupersetClient.get({
          endpoint: `/api/v1/annotation_layer/?q=${queryParams}`,
        }).then(({ json }) => {
          const layers = json
            ? json.result.map(layer => ({
                value: layer.id,
                label: layer.name,
              }))
            : [];
          setIsLoadingOptions(false);
          setValueOptions(layers);
        });
      } else if (requiresQuery(sourceType)) {
        const queryParams = rison.encode({
          filters: [
            {
              col: 'id',
              opr: 'chart_owned_created_favored_by_me',
              value: true,
            },
          ],
          order_column: 'slice_name',
          order_direction: 'asc',
          page: 0,
          page_size: FILTER_OPTIONS_LIMIT,
        });
        SupersetClient.get({
          endpoint: `/api/v1/chart/?q=${queryParams}`,
        }).then(({ json }) => {
          const registry = getChartMetadataRegistry();
          setIsLoadingOptions(false);
          setValueOptions(
            json.result
              .filter(x => {
                const metadata = registry.get(x.viz_type);
                return metadata && metadata.canBeAnnotationType(annotationType);
              })
              .map(x => ({
                value: x.id,
                label: x.slice_name,
                slice: {
                  ...x,
                  data: {
                    ...x.form_data,
                    groupby: x.form_data.groupby?.map(column =>
                      getColumnLabel(column),
                    ),
                  },
                },
              })),
          );
        });
      } else {
        setIsLoadingOptions(false);
        setValueOptions([]);
      }
    }
  }, [isLoadingOptions, annotationType]);
  const deleteAnnotationHandler = useCallback(() => {
    props.removeAnnotationLayer();
    props.close();
  }, []);
  const applyAnnotationHandler = useCallback(() => {
    if (isValidFormHandler()) {
      const annotationFields = [
        'name',
        'annotationType',
        'sourceType',
        'color',
        'opacity',
        'style',
        'width',
        'showMarkers',
        'hideLine',
        'value',
        'overrides',
        'show',
        'showLabel',
        'titleColumn',
        'descriptionColumns',
        'timeColumn',
        'intervalEndColumn',
      ];
      const newAnnotation = {};
      annotationFields.forEach(field => {
        if (stateHandler[field] !== null) {
          newAnnotation[field] = stateHandler[field];
        }
      });

      if (newAnnotation.color === AUTOMATIC_COLOR) {
        newAnnotation.color = null;
      }

      props.addAnnotationLayer(newAnnotation);
      setIsNew(false);
    }
  }, []);
  const submitAnnotationHandler = useCallback(() => {
    applyAnnotationHandler();
    props.close();
  }, []);
  const renderOptionHandler = useCallback(option => {
    return (
      <span
        css={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={option.label}
      >
        {option.label}
      </span>
    );
  }, []);
  const renderValueConfigurationHandler = useCallback(() => {
    let label = '';
    let description = '';
    if (requiresQuery(sourceType)) {
      if (sourceType === ANNOTATION_SOURCE_TYPES.NATIVE) {
        label = t('Annotation layer');
        description = t('Select the Annotation Layer you would like to use.');
      } else {
        label = t('Chart');
        description = t(
          `Use another existing chart as a source for annotations and overlays.
          Your chart must be one of these visualization types: [%s]`,
          getSupportedSourceTypesHandler(annotationType)
            .map(x => x.label)
            .join(', '),
        );
      }
    } else if (annotationType === ANNOTATION_TYPES.FORMULA) {
      label = t('Formula');
      description = t(`Expects a formula with depending time parameter 'x'
        in milliseconds since epoch. mathjs is used to evaluate the formulas.
        Example: '2x+5'`);
    }
    if (requiresQuery(sourceType)) {
      return (
        <SelectControl
          ariaLabel={t('Annotation layer value')}
          name="annotation-layer-value"
          showHeader
          hovered
          description={description}
          label={label}
          placeholder=""
          options={valueOptions}
          isLoading={isLoadingOptions}
          value={value}
          onChange={handleValueHandler}
          validationErrors={!value ? ['Mandatory'] : []}
          optionRenderer={renderOptionHandler}
          notFoundContent={<NotFoundContent />}
        />
      );
    }
    if (annotationType === ANNOTATION_TYPES.FORMULA) {
      return (
        <TextControl
          name="annotation-layer-value"
          hovered
          showHeader
          description={description}
          label={label}
          placeholder=""
          value={value}
          onChange={handleValueHandler}
          validationErrors={
            !isValidFormulaAnnotationHandler(value, annotationType)
              ? [t('Bad formula.')]
              : []
          }
        />
      );
    }
    return '';
  }, [annotationType, valueOptions, isLoadingOptions]);
  const renderSliceConfigurationHandler = useCallback(() => {
    const { slice } = valueOptions.find(x => x.value === value) || {};
    if (sourceType !== ANNOTATION_SOURCE_TYPES.NATIVE && slice) {
      const columns = (slice.data.groupby || [])
        .concat(slice.data.all_columns || [])
        .map(x => ({ value: x, label: x }));
      const timeColumnOptions = slice.data.include_time
        ? [{ value: '__timestamp', label: '__timestamp' }].concat(columns)
        : columns;
      return (
        <div style={{ marginRight: '2rem' }}>
          <PopoverSection
            isSelected
            title={t('Annotation Slice Configuration')}
            info={t(`This section allows you to configure how to use the slice
              to generate annotations.`)}
          >
            {(annotationType === ANNOTATION_TYPES.EVENT ||
              annotationType === ANNOTATION_TYPES.INTERVAL) && (
              <SelectControl
                ariaLabel={t('Annotation layer time column')}
                hovered
                name="annotation-layer-time-column"
                label={
                  annotationType === ANNOTATION_TYPES.INTERVAL
                    ? t('Interval start column')
                    : t('Event time column')
                }
                description={t(
                  'This column must contain date/time information.',
                )}
                validationErrors={!timeColumn ? ['Mandatory'] : []}
                clearable={false}
                options={timeColumnOptions}
                value={timeColumn}
                onChange={v => {
                  setTimeColumn(v);
                }}
              />
            )}
            {annotationType === ANNOTATION_TYPES.INTERVAL && (
              <SelectControl
                ariaLabel={t('Annotation layer interval end')}
                hovered
                name="annotation-layer-intervalEnd"
                label={t('Interval End column')}
                description={t(
                  'This column must contain date/time information.',
                )}
                validationErrors={!intervalEndColumn ? ['Mandatory'] : []}
                options={columns}
                value={intervalEndColumn}
                onChange={value => {
                  setIntervalEndColumn(value);
                }}
              />
            )}
            <SelectControl
              ariaLabel={t('Annotation layer title column')}
              hovered
              name="annotation-layer-title"
              label={t('Title Column')}
              description={t('Pick a title for you annotation.')}
              options={[{ value: '', label: t('None') }].concat(columns)}
              value={titleColumn}
              onChange={value => {
                setTitleColumn(value);
              }}
            />
            {annotationType !== ANNOTATION_TYPES.TIME_SERIES && (
              <SelectControl
                ariaLabel={t('Annotation layer description columns')}
                hovered
                name="annotation-layer-title"
                label={t('Description Columns')}
                description={t(
                  "Pick one or more columns that should be shown in the annotation. If you don't select a column all of them will be shown.",
                )}
                multi
                options={columns}
                value={descriptionColumns}
                onChange={value => {
                  setDescriptionColumns(value);
                }}
              />
            )}
            <div style={{ marginTop: '1rem' }}>
              <CheckboxControl
                hovered
                name="annotation-override-time_range"
                label={t('Override time range')}
                description={t(`This controls whether the "time_range" field from the current
                  view should be passed down to the chart containing the annotation data.`)}
                value={'time_range' in overrides}
                onChange={v => {
                  delete overrides.time_range;
                  if (v) {
                    setOverrides({ ...overrides, time_range: null });
                  } else {
                    setOverrides({ ...overrides });
                  }
                }}
              />
              <CheckboxControl
                hovered
                name="annotation-override-timegrain"
                label={t('Override time grain')}
                description={t(`This controls whether the time grain field from the current
                  view should be passed down to the chart containing the annotation data.`)}
                value={'time_grain_sqla' in overrides}
                onChange={v => {
                  delete overrides.time_grain_sqla;
                  delete overrides.granularity;
                  if (v) {
                    setOverrides({
                      ...overrides,
                      time_grain_sqla: null,
                      granularity: null,
                    });
                  } else {
                    setOverrides({ ...overrides });
                  }
                }}
              />
              <TextControl
                hovered
                name="annotation-layer-timeshift"
                label={t('Time Shift')}
                description={t(`Time delta in natural language
                  (example:  24 hours, 7 days, 56 weeks, 365 days)`)}
                placeholder=""
                value={overrides.time_shift}
                onChange={v => {
                  setOverrides({ ...overrides, time_shift: v });
                }}
              />
            </div>
          </PopoverSection>
        </div>
      );
    }
    return '';
  }, [valueOptions, annotationType]);
  const renderDisplayConfiguration = useMemo(() => {
    const colorScheme = getCategoricalSchemeRegistry()
      .get(props.colorScheme)
      .colors.concat();
    if (
      color &&
      color !== AUTOMATIC_COLOR &&
      !colorScheme.find(x => x.toLowerCase() === color.toLowerCase())
    ) {
      colorScheme.push(color);
    }
    return (
      <PopoverSection
        isSelected
        title={t('Display configuration')}
        info={t('Configure your how you overlay is displayed here.')}
      >
        <SelectControl
          ariaLabel={t('Annotation layer stroke')}
          name="annotation-layer-stroke"
          label={t('Style')}
          // see '../../../visualizations/nvd3_vis.css'
          options={[
            { value: 'solid', label: t('Solid') },
            { value: 'dashed', label: t('Dashed') },
            { value: 'longDashed', label: t('Long dashed') },
            { value: 'dotted', label: t('Dotted') },
          ]}
          value={style}
          clearable={false}
          onChange={v => {
            setStyle(v);
          }}
        />
        <SelectControl
          ariaLabel={t('Annotation layer opacity')}
          name="annotation-layer-opacity"
          label={t('Opacity')}
          // see '../../../visualizations/nvd3_vis.css'
          options={[
            { value: '', label: t('Solid') },
            { value: 'opacityLow', label: '0.2' },
            { value: 'opacityMedium', label: '0.5' },
            { value: 'opacityHigh', label: '0.8' },
          ]}
          value={opacity}
          onChange={value => {
            setOpacity(value);
          }}
        />
        <div>
          <ControlHeader label={t('Color')} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CompactPicker
              color={color}
              colors={colorScheme}
              onChangeComplete={v => {
                setColor(v.hex);
              }}
            />
            <Button
              style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
              buttonStyle={color === AUTOMATIC_COLOR ? 'success' : 'default'}
              buttonSize="xsmall"
              onClick={() => {
                setColor(AUTOMATIC_COLOR);
              }}
            >
              {t('Automatic Color')}
            </Button>
          </div>
        </div>
        <TextControl
          name="annotation-layer-stroke-width"
          label={t('Line width')}
          isInt
          value={width}
          onChange={v => {
            setWidth(v);
          }}
        />
        {annotationType === ANNOTATION_TYPES.TIME_SERIES && (
          <CheckboxControl
            hovered
            name="annotation-layer-show-markers"
            label={t('Show Markers')}
            description={t('Shows or hides markers for the time series')}
            value={showMarkers}
            onChange={v => {
              setShowMarkers(v);
            }}
          />
        )}
        {annotationType === ANNOTATION_TYPES.TIME_SERIES && (
          <CheckboxControl
            hovered
            name="annotation-layer-hide-line"
            label={t('Hide Line')}
            description={t('Hides the Line for the time series')}
            value={hideLine}
            onChange={v => {
              setHideLine(v);
            }}
          />
        )}
      </PopoverSection>
    );
  }, [color, annotationType]);

  const {
    name,
    annotationType: annotationTypeProp,
    sourceType,
    opacity,
    style,
    width,
    showMarkers,
    hideLine,
    value,
    overrides,
    show,
    showLabel,
    titleColumn,
    descriptionColumns,
    timeColumn,
    intervalEndColumn,
    vizType,
  } = props;
  overrides.time_range = null;
  delete overrides.since;
  delete overrides.until;
  const metadata = getChartMetadataRegistry().get(vizType);
  const supportedAnnotationTypes = metadata?.supportedAnnotationTypes || [];
  const validAnnotationType = supportedAnnotationTypes.includes(
    annotationTypeProp,
  )
    ? annotationTypeProp
    : supportedAnnotationTypes[0];

  submitAnnotationHandler = submitAnnotationHandler.bind(this);
  deleteAnnotationHandler = deleteAnnotationHandler.bind(this);
  applyAnnotationHandler = applyAnnotationHandler.bind(this);
  fetchOptions = fetchOptions.bind(this);
  handleAnnotationTypeHandler = handleAnnotationTypeHandler.bind(this);
  handleAnnotationSourceTypeHandler =
    handleAnnotationSourceTypeHandler.bind(this);
  handleValueHandler = handleValueHandler.bind(this);
  isValidFormHandler = isValidFormHandler.bind(this);

  const isValid = isValidFormHandler();
  const metadata = getChartMetadataRegistry().get(props.vizType);
  const supportedAnnotationTypes = metadata
    ? metadata.supportedAnnotationTypes.map(
        type => ANNOTATION_TYPES_METADATA[type],
      )
    : [];
  const supportedSourceTypes = getSupportedSourceTypesHandler(annotationType);

  return (
    <>
      {props.error && (
        <span style={{ color: props.theme.colors.error.base }}>
          ERROR: {props.error}
        </span>
      )}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ marginRight: '2rem' }}>
          <PopoverSection
            isSelected
            title={t('Layer configuration')}
            info={t('Configure the basics of your Annotation Layer.')}
          >
            <TextControl
              name="annotation-layer-name"
              label={t('Name')}
              placeholder=""
              value={name}
              onChange={v => {
                setName(v);
              }}
              validationErrors={!name ? [t('Mandatory')] : []}
            />
            <CheckboxControl
              name="annotation-layer-hide"
              label={t('Hide layer')}
              value={!show}
              onChange={v => {
                setShow(!v);
              }}
            />
            <CheckboxControl
              name="annotation-label-show"
              label={t('Show label')}
              value={showLabel}
              hovered
              description={t('Whether to always show the annotation label')}
              onChange={v => {
                setShowLabel(v);
              }}
            />
            <SelectControl
              ariaLabel={t('Annotation layer type')}
              hovered
              description={t('Choose the annotation layer type')}
              label={t('Annotation layer type')}
              name="annotation-layer-type"
              clearable={false}
              options={supportedAnnotationTypes}
              value={annotationType}
              onChange={handleAnnotationTypeHandler}
            />
            {supportedSourceTypes.length > 0 && (
              <SelectControl
                ariaLabel={t('Annotation source type')}
                hovered
                description={t('Choose the source of your annotations')}
                label={t('Annotation source')}
                name="annotation-source-type"
                options={supportedSourceTypes}
                notFoundContent={<NotFoundContent />}
                value={sourceType}
                onChange={handleAnnotationSourceTypeHandler}
                validationErrors={!sourceType ? [t('Mandatory')] : []}
              />
            )}
            {renderValueConfigurationHandler()}
          </PopoverSection>
        </div>
        {renderSliceConfigurationHandler()}
        {renderDisplayConfiguration()}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {isNew ? (
          <Button buttonSize="small" onClick={() => props.close()}>
            {t('Cancel')}
          </Button>
        ) : (
          <Button buttonSize="small" onClick={deleteAnnotationHandler}>
            {t('Remove')}
          </Button>
        )}
        <div>
          <Button
            buttonSize="small"
            disabled={!isValid}
            onClick={applyAnnotationHandler}
          >
            {t('Apply')}
          </Button>

          <Button
            buttonSize="small"
            buttonStyle="primary"
            disabled={!isValid}
            onClick={submitAnnotationHandler}
          >
            {t('OK')}
          </Button>
        </div>
      </div>
    </>
  );
};

AnnotationLayer.propTypes = propTypes;
AnnotationLayer.defaultProps = defaultProps;

export default withTheme(AnnotationLayer);
