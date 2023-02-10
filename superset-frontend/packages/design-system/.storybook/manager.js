// .storybook/manager.js

import { addons } from '@storybook/manager-api';
import supersetTheme from './supersetTheme';

addons.setConfig({
  theme: supersetTheme,
});
