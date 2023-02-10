import React, { PropsWithChildren } from 'react';
import { styled } from '../../foundations/theme';
import { EContainerLayer, IContainerProps } from './IContainerProps';

const StyledContainer = styled.div<IContainerProps>`
  ${({ theme, layer = EContainerLayer.INHERIT }) => {
    const bgColor = theme?.colors?.background?.[layer] ?? 'none';
    return `
      background: ${bgColor};
      color: ${theme?.colors?.text?.primary};
      padding: ${theme.gridUnit * 3}px;
      margin: ${theme.gridUnit * 3}px;
      border-radius: ${theme.borderRadius}px;
  `;
  }}
`;

const Container = (props: PropsWithChildren<IContainerProps>) => {
  const { layer } = props;
  return (
    <StyledContainer layer={layer}>{props.children ?? 'empty'}</StyledContainer>
  );
};

export default Container;
