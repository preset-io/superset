// .storybook/manager.js

import { addons } from '@storybook/addons';
import supersetTheme from './supersetTheme';

addons.setConfig({
  theme: supersetTheme,
});
