import { ISupersetTheme } from '../../index';

/**
 * Props for components adhering tot the IExampleComponent interface
 */
export interface IExampleComponentProps {
  /**
   * Large text displayed as the title
   */
  headline: string;
  /**
   * Normal text displayed below the title
   */
  tagline: string;
  /**
   * Superset theme objects provided by SupersetThemeProvider
   */
  theme?: ISupersetTheme;
}
