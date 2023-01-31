import { create } from '@storybook/theming';

export default create({
  base: 'light',
  colorPrimary: '#20a7c9',
  colorSecondary: '#20a7c9',

  // UI
  appBg: 'white',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',
  /*
  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: 'black',
  barBg: 'hotpink',


  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,
*/

  brandTitle: 'Apache Superset Design System',
  brandUrl: 'https://superset.apache.org/',
  brandImage: 'https://superset.apache.org/img/superset-logo-horiz.svg',
  brandTarget: '_self',
});
