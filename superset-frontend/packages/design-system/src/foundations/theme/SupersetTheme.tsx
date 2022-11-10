import React from 'react';
import { ThemeProvider, getTheme, Global, css } from './index';
import { generateTheme } from './antdTheme';

export function SupersetTheme(props) {
  const { mode } = props;
  const themeObject = getTheme(mode);
  return (
    <ThemeProvider theme={themeObject}>
      <div>
        <Global
          styles={css`
            ${generateTheme(themeObject)}
          `}
        />

        {props.children}
      </div>
    </ThemeProvider>
  );
}

export default SupersetTheme;
