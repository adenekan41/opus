import React from 'react';
import styled from 'styled-components';
import { sharedProps } from '../Avatar';

const CardContainer = styled.div`
  border-radius: 5px;
  box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
  background-color: ${props => props.bgColor || '#ffffff'};
  padding: ${props => props.padding};
  ${sharedProps};
`;

const Card = ({ children, bgColor, padding, ...rest }) => (
  <CardContainer bgColor={bgColor} padding={padding} {...rest}>
    {children}
  </CardContainer>
);

export default Card;
