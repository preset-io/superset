import { themes } from '@storybook/theming';

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
};
