import React from 'react';
import { styled } from '../../foundations/theme';
import { IExampleComponentProps } from './IExampleComponentProps';
import Container from '../Container';
import { EContainerLayer } from '../Container/IContainerProps';

const ExampleStyled = styled.div<IExampleComponentProps>`
  ${({ theme }) => `
      color: ${theme?.colors?.text?.primary};

     h1 {
        color: ${theme?.colors?.text?.primary};
      }
  `}
`;

const ExampleComponent = (props: IExampleComponentProps) => {
  const { headline, tagline } = props;
  return (
    <Container layer={EContainerLayer.BASE}>
      <ExampleStyled {...props}>
        <h1>{headline}</h1>
        <p>{tagline}</p>
      </ExampleStyled>
    </Container>
  );
};

export default ExampleComponent;
