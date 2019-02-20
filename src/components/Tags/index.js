import React from 'react';
import styled from 'styled-components';

const sharedTagStyles = `
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  font-size: 12px;
  padding: 0 12px;
`;

const TagContainer = styled.div`
  ${sharedTagStyles}
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
`;

export function Tag({
  children,
  bgColor,
  textColor,
}) {
  return (
    <TagContainer bgColor={bgColor} textColor={textColor} className="Tag">
      {children}
    </TagContainer>
  );
}

Tag.defaultProps = {
  textColor: '#8c8c8c',
  bgColor: '#e6e6e6',
};

const TagButtonContainer = styled.a`
  ${sharedTagStyles};
  cursor: pointer;
  background-color: ${props =>
    props.isActive ? props.activeBgColor : props.bgColor};
  color: ${props =>
    props.isActive ? props.activeTextColor : props.textColor}!important;
`;

export function TagButton({
  children,
  bgColor,
  textColor,
  isActive,
  onClick,
  style,
  activeBgColor,
  activeTextColor,
}) {
  return (
    <TagButtonContainer
      bgColor={bgColor}
      textColor={textColor}
      isActive={isActive}
      onClick={onClick}
      className="Tag"
      style={style}
      activeBgColor={activeBgColor}
      activeTextColor={activeTextColor}
    >
      {children}
    </TagButtonContainer>
  );
}

TagButton.defaultProps = {
  textColor: '#8c8c8c',
  bgColor: '#e6e6e6',
  activeBgColor: '#242424',
  activeTextColor: '#ffffff',
};
