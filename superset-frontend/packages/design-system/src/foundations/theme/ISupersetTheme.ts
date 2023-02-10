export interface ISupersetTheme {
  borderRadius: number;
  colors: {
    background: {
      base: string;
      elevated: string;
      light: string;
    };
    shade: {
      s25: string;
      s45: string;
      s75: string;
    };
    highlight: {
      h65: string;
    };
    text: {
      label: string;
      help: string;
      primary: string;
    };
    primary: {
      base: string;
      dark1: string;
      dark2: string;
      light1: string;
      light2: string;
      light3: string;
      light4: string;
      light5: string;
    };
    secondary: {
      base: string;
      dark1: string;
      dark2: string;
      dark3: string;
      light1: string;
      light2: string;
      light3: string;
      light4: string;
      light5: string;
    };
    grayscale: {
      base: string;
      dark1: string;
      dark2: string;
      light1: string;
      light2: string;
      light3: string;
      light4: string;
      light5: string;
    };
    error: {
      base: string;
      dark1: string;
      dark2: string;
      light1: string;
      light2: string;
    };
    warning: {
      base: string;
      dark1: string;
      dark2: string;
      light1: string;
      light2: string;
    };
    alert: {
      base: string;
      dark1: string;
      dark2: string;
      light1: string;
      light2: string;
    };
    success: {
      base: string;
      dark1: string;
      dark2: string;
      light1: string;
      light2: string;
    };
    info: {
      base: string;
      dark1: string;
      dark2: string;
      light1: string;
      light2: string;
    };
  };
  opacity: {
    light: string;
    mediumLight: string;
    mediumHeavy: string;
    heavy: string;
  };
  typography: {
    families: {
      sansSerif: string;
      serif: string;
      monospace: string;
    };
    weights: {
      light: number;
      normal: number;
      medium: number;
      bold: number;
    };
    sizes: {
      xxs: number;
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
      xxl: number;
    };
  };

  zIndex: {
    aboveDashboardCharts: number;
    dropdown: number;
    max: number;
  };
  transitionTiming: number;
  gridUnit: 4;
}
