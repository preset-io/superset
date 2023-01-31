import { themes } from '@storybook/theming';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import React, { useState, useEffect } from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import addons from '@storybook/addons';
import SupersetThemeProvider from '../src/foundations/theme/SupersetThemeProvider';
import '../src/foundations/theme/antd.css';

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
  darkMode: {
    // Override the default dark theme
    dark: {
      ...themes.dark,
      appBg: 'rgb(25, 25, 25)',
      brandTitle: 'Apache Superset Design System',
      brandUrl: 'https://superset.apache.org/',
      brandImage: 'https://superset.apache.org/img/superset-logo-horiz.svg',
    },
    // Override the default light theme
    light: {
      ...themes.normal,
      appBg: 'rgb(245,245,245)',
      brandTitle: 'Apache Superset Design System',
      brandUrl: 'https://superset.apache.org/',
      brandImage: 'https://superset.apache.org/img/superset-logo-horiz.svg',
    },
  },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports,
    },
  },
};

export const decorators = [
  Story => {
    const channel = addons.getChannel();
    // this example uses hook but you can also use class component as well
    const [isDark, setDark] = useState(false);

    useEffect(() => {
      // listen to DARK_MODE event
      channel.on(DARK_MODE_EVENT_NAME, setDark);
      return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
    }, [setDark]);

    // render your custom theme provider
    return (
      <SupersetThemeProvider mode={isDark ? 'dark' : 'light'}>
        <Story />
      </SupersetThemeProvider>
    );
  },
];
