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
import React from 'react';
import { styled, supersetTheme } from '@superset-ui/core';
import Icons from '.';
import IconType, { IconSize } from './IconType';
import Icon from './Icon';
import { linkTo } from '@storybook/addon-links';

export default {
  title: 'Design System/Foundations/Icons/Tutorial',
  component: Icon,
};

const palette = { Default: null };
Object.entries(supersetTheme.colors).forEach(([familyName, family]) => {
  Object.entries(family).forEach(([colorName, colorValue]) => {
    palette[`${familyName} / ${colorName}`] = colorValue;
  });
});

const example1args = {
  iconSize: {
    defaultValue: 'xl',
    control: { type: 'inline-radio', options: ['s', 'l', 'm', 'xl', 'xxl'] },
  },
  iconColor: {
    defaultValue: null,
    control: { type: 'select', options: palette },
  },
  theme: {
    table: {
      disable: true,
    },
  },
};

const example1 = `
import IconType, { IconSize } from './IconType';
import Icon from './Icon';

<Icons.InfoSolidSmall role="img" iconSize={${example1args.iconSize.defaultValue}} iconColor={iconColor} />

`;

export const IconExamples = ({
  iconSize = IconSize.M,
  iconColor = 'black',
}: IconType) => (
  <div>
    <p>Icons are cool</p>
    <p>Here is a single icon</p>
    <Icons.InfoSolidSmall
      role="img"
      iconSize={iconSize}
      iconColor={iconColor}
    />
    <pre>{example1}</pre>
    <a href="/?path=/story/design-system-foundations-icons-icon-listing--interactive-icons">
      See full listing of avaiable Icons
    </a>
  </div>
);

IconExamples.argTypes = example1args;

IconExamples.story = {
  parameters: {
    knobs: {
      disable: true,
    },
  },
};
