import React, { useState, useMemo } from 'react';
import { ThemeProvider, getTheme, Global, css } from './index';
import { generateTheme } from './antdTheme';

export enum EThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface SupersetThemeProviderProps {
  mode?: EThemeMode;
  themeOverride: Object;
}

export function SupersetThemeProvider(props: SupersetThemeProviderProps) {
  const [themeObject, setThemeObject] = useState({});
  const { mode = EThemeMode.LIGHT, themeOverride } = props;
  console.log('REDNERING THEME PROV');
  const globalStyle = useMemo(() => {
    console.log('INSIDE MEMOIZATION');
    const themOb = getTheme(mode, themeOverride);
    setThemeObject(themOb);
    return (
      <Global
        styles={css`
          ${generateTheme(themOb)}
        `}
      />
    );
  }, [mode, themeOverride]);

  //const themeObject = getTheme(mode, themeOverride);
  return (
    <ThemeProvider theme={themeObject}>
      {globalStyle}
      <div>{props.children}</div>
    </ThemeProvider>
  );
}

export default SupersetThemeProvider;
