import { ISupersetTheme } from '../../foundations/theme';

export enum EContainerLayer {
  INHERIT = 'inherit',
  BASE = 'base',
  ELEVATED = 'elevated',
  LIGHT = 'light',
}

/**
 * Props for components adhering tot the IExampleComponent interface
 */
export interface IContainerProps {
  /**
   * Large text displayed as the title
   */
  theme?: ISupersetTheme;
  /**
   * Controls which background color is used for visual stacking / elevation
   */
  layer?: EContainerLayer;
}
