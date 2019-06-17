import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { sharedProps } from '../Avatar';
import { Icon } from "../Icon";

const generateSize = (size, fontSize) => {
  if (size === 'small')
    return css`
      height: 32px;
      padding: 0 16px;
      font-size: ${fontSize || '14px'};
    `;
  else if (size === 'large')
    return css`
      height: 56px;
      padding: 0 16px;
      font-size: ${fontSize || '16px'};
    `;
  else
    return css`
      height: 48px;
      padding: 0 16px;
      font-size: ${fontSize || '16px'};
    `;
};
const generateType = (
  kind = 'primary',
  color = '#ffffff',
  background = '#000000'
) => {
  if (kind === 'primary')
    return css`
      color: ${color};
      background: ${background};
      border-color: ${background};
      &:hover {
        opacity: 0.8;
      }
    `;
  else if (kind === 'red')
    return css`
      color: #ffffff;
      border: 1px solid #f66262 !important;
      background: #f66262;
      &:hover,
      &:active {
        color: #ffffff;
        background: #f66262;
      }
    `;
  else if (kind === 'orange')
    return css`
      color: #ffffff;
      border: 1px solid #ff9901 !important;
      background: #ff9901;
      &:hover,
      &:active {
        color: #ffffff;
        background: #ff9901;
      }
    `;
  else if (kind === 'gray')
    return css`
      color: #ffffff;
      border: 1px solid #8c8c8c !important;
      background: #8c8c8c;
      &:hover,
      &:active {
        color: #ffffff;
        background: #8c8c8c;
      }
    `;
  else if (kind === 'green')
    return css`
      color: #ffffff;
      border: 1px solid #29cb98 !important;
      background: #29cb98;
      &:hover,
      &:active {
        color: #ffffff;
        background: #29cb98;
      }
    `;
  else if (kind === 'secondary')
    return css`
      color: ${background};
      border: 1px solid ${background}!important;
      background: transparent;
      &:hover,
      &:active {
        color: ${color};
        background: ${background};
      }
    `;
  else if (kind === 'ghost')
    return css`
      color: ${color || background};
      border: none;
      background: none;
    `;
};
export const ButtonSkeleton = styled.button`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
  ${props =>
    props.block
      ? 'width: 100%'
      : `width : ${props => (props.width ? props.width : 'auto')}`};
  border-radius: ${props => (props.radius ? props.radius : '3px')};
  font-weight: ${props => (props.weight === 'bold' ? 900 : 400)};
  ${props => generateSize(props.size)};
  ${props => generateType(props.kind, props.color, props.background)};
  box-shadow: none;
  border: none;

  &:active,
  &:focus {
    outline: none;
  }
  &:hover {
    transition: all 0.25s ease-in;
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  ${css`
    ${props => props.css};
  `};

  ${sharedProps};
`;

const Button = props => {
  const {
    width,
    children,
    isLoading,
    icon,
    loadingText,
    disabled,
    css,
    type = 'submit',
    ...rest
  } = props;
  return (
    <ButtonSkeleton
      width={width}
      disabled={disabled || isLoading}
      css={css}
      type={type}
      {...rest}
    >
      {isLoading ? loadingText : children}
    </ButtonSkeleton>
  );
};

Button.defaultProps = {
  isLoading: false,
  showSpinner: false,
  loadingText: 'Loading...',
};

Button.propTypes = {
  kind: PropTypes.string,
  css: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string,
  size: PropTypes.string,
  block: PropTypes.bool,
  icon: PropTypes.string,
  showSpinner: PropTypes.bool,
  loadingText: PropTypes.any,
  margin: PropTypes.string,
};

export const EmptyButton = styled.button`
  font-family: 'Avenir Opus', sans-serif;
  font-weight: 500;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
  border-radius: 3px;
  background: none;
  align-items: center;
  justify-content: center;
  display: flex;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  width: ${props => (props.block ? '100%' : 'auto')};
  ${props => props.css};

  &:focus {
    outline: 0;
  }
`;

const StyledCloseButton = styled(EmptyButton)`
  border-radius: ${props => (props.isRound ? "100%" : "4px")};
  width: ${props => props.size};
  height: ${props => props.size};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:focus {
    box-shadow: ${props => props.theme.colors.cyan.faint} 0px 0px 0px 3px
  }

  .Chakra-Alert & {
    &:hover {
      background-color: transparent;
    }
  }
`;


export const EmptyIconButton = ({
  icon,
  onClick,
  iconColor,
  className,
  size,
  iconSize,
  isRound,
  ...rest
}) => (
  <StyledCloseButton
    className={`EmptyIconButton ${className}`.trim()}
    type="button"
    {...{ onClick, size, isRound, ...rest }}
  >
    <Icon color={iconColor} size={iconSize} name={icon} />
  </StyledCloseButton>
);

EmptyIconButton.defaultProps = {
  size: "40px",
  className: "",
  iconSize: "24px"
};

const StyledEmptyIconButton = styled(EmptyIconButton)`
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;


export const CloseButton = ({
  onClick,
  iconColor,
  className,
  size,
  iconSize,
  isRound,
  ...rest
}) => (
  <StyledEmptyIconButton
    icon="close"
    className={`CloseButton ${className}`.trim()}
    type="button"
    {...{ onClick, size, isRound, iconSize, iconColor, ...rest }}
  />
);

export default Button;
