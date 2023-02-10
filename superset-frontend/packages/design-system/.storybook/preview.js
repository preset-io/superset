import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import React, { useState } from 'react';
import SupersetThemeProvider from '../src/components/ThemeProvider/SupersetThemeProvider';
import '../src/foundations/theme/antd.css';
import { EThemeMode } from '../src/components/ThemeProvider/SupersetThemeProvider';
import { Switch } from 'antd';
import Container from '../src/components/Container';
import { EContainerLayer } from '../src/components/Container/IContainerProps';

const customViewports = {
  SXGA: {
    name: 'SXGA 1280 x 1024',
    styles: {
      width: '1280px',
      height: '1024px',
    },
  },
  HD: {
    name: 'HD 1366 x 768',
    styles: {
      width: '1366px',
      height: '768px',
    },
  },
  HDPLUS: {
    name: 'HD+ 1600 x 900',
    styles: {
      width: '1600px',
      height: '900px',
    },
  },
  FHD: {
    name: 'Full HD 1920 x 1080',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  WUXGA: {
    name: 'Wide Quad HD 3440 x 1440',
    styles: {
      width: '3440px',
      height: '1440px',
    },
  },
  QHD: {
    name: 'Quad HD 2560 x 1440',
    styles: {
      width: '2560px',
      height: '1440px',
    },
  },
  WQHD: {
    name: 'Wide Quad HD 3440 x 1440',
    styles: {
      width: '3440px',
      height: '1440px',
    },
  },
  UHD: {
    name: '4K 3440 x 2160',
    styles: {
      width: '3440px',
      height: '2160px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  paddings: {
    values: [
      { name: 'None', value: '0px' },
      { name: 'Small', value: '16px' },
      { name: 'Medium', value: '32px' },
      { name: 'Large', value: '64px' },
    ],
    default: 'Medium',
  },
  options: {
    storySort: {
      order: [
        'Welcome',
        'How to use',
        'Foundations',
        [
          'Overview',
          'Examples',
          'Grid',
          'Typography',
          'Color,',
          'Icons',
          'Theme',
          '*',
        ],
        'Components',
        ['Overview', 'Examples', '*'],
        'Patterns',
        ['Overview', 'Examples', '*'],
        '*',
      ],
    },
  },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports,
    },
  },
};

const THEME_OVERRIDE = {
  /*light: {
    colors: {
      background: {
        base: 'green',
        elevated: 'yellow',
        light: 'red',
      },
    },
  },
  dark: {
    colors: {
      background: {
        base: 'orange',
        elevated: 'pink',
        light: 'purple',
      },
    },
  },*/
};

export const decorators = [
  renderStory => {
    const [useDarkMode, setUseDarkMode] = useState(true);
    const onChange = checked => {
      setUseDarkMode(checked);
    };
    return (
      <div>
        <SupersetThemeProvider
          mode={useDarkMode ? EThemeMode.DARK : EThemeMode.LIGHT}
          themeOverride={THEME_OVERRIDE}
        >
           <Container layer={EContainerLayer.BASE}>
          <Switch
            defaultChecked
            checkedChildren="Dark Mode"
            unCheckedChildren="Light Mode"
            onChange={onChange}
          />
          {renderStory()}
          </Container>
        </SupersetThemeProvider>
      </div>
    );
  },
];
