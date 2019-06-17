import React from 'react';
import styled, { keyframes } from 'styled-components';
import propTypes from 'prop-types';
import { Flex } from 'rebass';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-color: ${props => props.border};
  border-top-color: ${props => props.color};
  border-left-color: ${props => props.color};
  animation: ${spin} ${props => props.speed}s linear infinite;
  border-style: solid;
  border-width: ${props => props.thickness};
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
`;

export function Spinner({ color, size, speed, thickness, border }) {
  return (
    <StyledSpinner
      {...{ color, size, speed, thickness, border }}
      className="Spinner"
      role="alert"
      ariaLive="assertive"
    />
  );
}

Spinner.defaultProps = {
  size: 16,
  color: '#ff9901',
  speed: 0.3,
  marginLeft: 0,
  thickness: '2px',
  border: 'rgba(255,255,255,0.2)',
};

Spinner.propTypes = {
  size: propTypes.number,
  color: propTypes.string,
  speed: propTypes.number,
};

export function FullScreenSpinner(props) {
  return (
    <Flex
      style={{ position: 'absolute', height: props.height || 'calc(100vh - 80px)' }}
      width={props.width || "100%"}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner {...props} />
    </Flex>
  );
}

FullScreenSpinner.defaultProps = {
  size: 16,
  color: '#ff9901',
  speed: 0.3,
  marginLeft: 0,
  thickness: '2px',
  border: 'rgba(255,255,255,0.2)',
};

FullScreenSpinner.propTypes = {
  size: propTypes.number,
  color: propTypes.string,
  speed: propTypes.number,
};
