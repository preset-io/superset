/* eslint-disable theme-colors/no-literal-colors */
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
import emotionStyled from '@emotion/styled';
import { useTheme as useThemeBasic } from '@emotion/react';
import createCache from '@emotion/cache';
import { merge, cloneDeep } from 'lodash';
import { EThemeMode } from './SupersetThemeProvider';

export {
  Global,
  css,
  jsx,
  ThemeProvider,
  CacheProvider as EmotionCacheProvider,
  withTheme,
} from '@emotion/react';
export { default as createEmotionCache } from '@emotion/cache';
export * from './SupersetThemeProvider';
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends SupersetTheme {}
}

export function useTheme() {
  const theme = useThemeBasic();
  // in the case there is no theme, useTheme returns an empty object
  if (Object.keys(theme).length === 0 && theme.constructor === Object) {
    throw new Error(
      'useTheme() could not find a ThemeContext. The <ThemeProvider/> component is likely missing from the app.',
    );
  }
  return theme;
}

export const emotionCache = createCache({
  key: 'superset',
});

export const styled = emotionStyled;

const getBaseTheme = () => {
  const base = {
    borderRadius: 4,
    colors: {
      background: {
        base: 'rgb(245,245,245)',
        elevated: 'rgb(250,250,250)',
        light: 'rgb(255,255,255)',
      },
      shade: {
        s25: 'rgba(0,0,0, 0.25)',
        s45: 'rgba(0,0,0, 0.45)',
        s75: 'rgba(0,0,0, 0.75)',
      },
      highlight: {
        h65: 'rgba(255,255,255, 0.65)',
      },
      text: {
        label: '#879399',
        help: '#737373',
        primary: 'rgba(0,0,0,0.85)',
      },
      primary: {
        base: '#20A7C9',
        dark1: '#1A85A0',
        dark2: '#156378',
        light1: '#79CADE',
        light2: '#A5DAE9',
        light3: '#D2EDF4',
        light4: '#E9F6F9',
        light5: '#F3F8FA',
      },
      secondary: {
        base: '#444E7C',
        dark1: '#363E63',
        dark2: '#282E4A',
        dark3: '#1B1F31',
        light1: '#8E94B0',
        light2: '#B4B8CA',
        light3: '#D9DBE4',
        light4: '#ECEEF2',
        light5: '#F5F5F8',
      },
      grayscale: {
        base: '#666666',
        dark1: '#323232',
        dark2: '#000000',
        light1: '#B2B2B2',
        light2: '#E0E0E0',
        light3: '#F0F0F0',
        light4: '#F7F7F7',
        light5: '#FFFFFF',
      },
      error: {
        base: '#E04355',
        dark1: '#A7323F',
        dark2: '#6F212A',
        light1: '#EFA1AA',
        light2: '#FAEDEE',
      },
      warning: {
        base: '#FF7F44',
        dark1: '#BF5E33',
        dark2: '#7F3F21',
        light1: '#FEC0A1',
        light2: '#FFF2EC',
      },
      alert: {
        base: '#FCC700',
        dark1: '#BC9501',
        dark2: '#7D6300',
        light1: '#FDE380',
        light2: '#FEF9E6',
      },
      success: {
        base: '#5AC189',
        dark1: '#439066',
        dark2: '#2B6144',
        light1: '#ACE1C4',
        light2: '#EEF8F3',
      },
      info: {
        base: '#66BCFE',
        dark1: '#4D8CBE',
        dark2: '#315E7E',
        light1: '#B3DEFE',
        light2: '#EFF8FE',
      },
    },
    opacity: {
      light: '10%',
      mediumLight: '35%',
      mediumHeavy: '60%',
      heavy: '80%',
    },
    typography: {
      families: {
        sansSerif: `'Inter', Helvetica, Arial`,
        serif: `Georgia, 'Times New Roman', Times, serif`,
        monospace: `'Fira Code', 'Courier New', monospace`,
      },
      weights: {
        light: 200,
        normal: 400,
        medium: 500,
        bold: 600,
      },
      sizes: {
        xxs: 9,
        xs: 10,
        s: 12,
        m: 14,
        l: 16,
        xl: 21,
        xxl: 28,
      },
    },
    zIndex: {
      aboveDashboardCharts: 10,
      dropdown: 11,
      max: 3000,
    },
    transitionTiming: 0.3,
    gridUnit: 4,
  };

  return cloneDeep(base);
};

const darkTheme = {
  colors: {
    background: {
      base: 'rgb(0,0,0)',
      elevated: 'rgb(22,22,24)',
      light: 'rgb(33,33,36)',
    },
    shade: {
      s25: 'rgba(255,255,255, 0.25)',
      s45: 'rgba(255,255,255, 0.45)',
      s75: 'rgba(255,255,255, 0.75)',
    },
    highlight: {
      h65: 'rgba(0,0,0, 0.65)',
    },
    text: {
      label: '#FF0000',
      help: '#737373',
      primary: 'rgba(255,255,255,0.85)',
    },
    primary: {
      base: '#20A7C9',
      dark1: '#1A85A0',
      dark2: '#156378',
      light1: '#79CADE',
      light2: '#A5DAE9',
      light3: '#D2EDF4',
      light4: '#E9F6F9',
      light5: '#F3F8FA',
    },
    secondary: {
      base: '#444E7C',
      dark1: '#363E63',
      dark2: '#282E4A',
      dark3: '#1B1F31',
      light1: '#8E94B0',
      light2: '#B4B8CA',
      light3: '#D9DBE4',
      light4: '#ECEEF2',
      light5: '#F5F5F8',
    },
    grayscale: {
      base: '#666666',
      dark1: '#323232',
      dark2: '#000000',
      light1: '#B2B2B2',
      light2: '#E0E0E0',
      light3: '#F0F0F0',
      light4: '#F7F7F7',
      light5: '#FFFFFF',
    },
    error: {
      base: '#E04355',
      dark1: '#A7323F',
      dark2: '#6F212A',
      light1: '#EFA1AA',
      light2: '#FAEDEE',
    },
    warning: {
      base: '#FF7F44',
      dark1: '#BF5E33',
      dark2: '#7F3F21',
      light1: '#FEC0A1',
      light2: '#FFF2EC',
    },
    alert: {
      base: '#FCC700',
      dark1: '#BC9501',
      dark2: '#7D6300',
      light1: '#FDE380',
      light2: '#FEF9E6',
    },
    success: {
      base: '#5AC189',
      dark1: '#439066',
      dark2: '#2B6144',
      light1: '#ACE1C4',
      light2: '#EEF8F3',
    },
    info: {
      base: '#66BCFE',
      dark1: '#4D8CBE',
      dark2: '#315E7E',
      light1: '#B3DEFE',
      light2: '#EFF8FE',
    },
  },
};

export const getTheme = (mode: EThemeMode, themeOverride: object) => {
  let mergedTheme = getBaseTheme();

  if (mode === 'dark') {
    const darkCopy = cloneDeep(darkTheme);
    mergedTheme = merge(mergedTheme, darkCopy);
  }
  if (typeof themeOverride?.[mode] === 'object') {
    mergedTheme = merge(mergedTheme, themeOverride[mode]);
  }

  return mergedTheme;
};

export type SupersetTheme = typeof defaultTheme;

export interface SupersetThemeProps {
  theme: SupersetTheme;
}

// export const supersetTheme = getTheme(mode);
