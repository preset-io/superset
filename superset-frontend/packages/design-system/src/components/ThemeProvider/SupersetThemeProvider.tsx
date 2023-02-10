import React, { useState, useEffect, PropsWithChildren } from 'react';
import {
  ThemeProvider,
  getTheme,
  Global,
  css,
} from '../../foundations/theme/index';
import { generateTheme } from '../../foundations/theme/antdTheme';

export enum EThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface SupersetThemeProviderProps {
  mode?: EThemeMode;
  themeOverride: Object;
}

export function SupersetThemeProvider(
  props: PropsWithChildren<SupersetThemeProviderProps>,
) {
  const { mode = EThemeMode.LIGHT, themeOverride } = props;
  const [themeObject, setThemeObject] = useState<object>(
    getTheme(mode, themeOverride),
  );
  const [globalStyle, setGlobalStyle] = useState<string>('');

  useEffect(() => {
    const themOb = getTheme(mode, themeOverride);
    setThemeObject(themOb);
    // This is for overriding theme items that still come in from static CSS / LESS/ SASS
    // This allows for consolidation of antd overrides instead of at every component level
    setGlobalStyle(generateTheme(themOb));
  }, [mode, themeOverride]);

  return (
    <ThemeProvider theme={themeObject}>
      {globalStyle && (
        <Global
          styles={css`
            ${globalStyle}
          `}
        />
      )}
      <div>{props.children}</div>
    </ThemeProvider>
  );
}

export default SupersetThemeProvider;
