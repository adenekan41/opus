import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Text } from 'rebass';
import { Icon } from '../Icon';
import { sharedProps } from '../Avatar';

const hasStripStyle = `
    &:before {
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        background-color: #242424;
        width: 2px;
    }
`;
const InputContainer = styled.div`
  position: relative;
  height: 60px;
  box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
  box-sizing: border-box;
  background-color: #ffffff;
  ${props => (props.hasStrip ? `` : `border-radius: 3px`)};
  ${props => (props.isInvalid ? 'border: solid 0.5px #f66262 ' : '')};
  ${props =>
    props.isInvalid && props.hasStrip ? 'border: solid 0.5px #f66262 ' : ''};
  ${props =>
    props.hasStrip
      ? `border: none`
      : `border: solid 0.5px rgba(18, 18, 18, 0.11)`};

  &:focus-within {
    outline: none;
    ${props =>
      props.hasStrip
        ? `border-bottom: solid 0.5px rgba(18, 18, 18, 0.11); border-left: solid 3px #242424;`
        : `border: solid 0.5px rgba(255, 153, 1, 0.8)`};
  }

  .label {
    position: absolute;
    z-index: 2;
    top: 10px;
    padding: 8px 0 8px 16px;
    transition: all 200ms;
    opacity: 0.5;
    display: inline-block;
    color: #8c8c8c;
  }

  .input {
    position: absolute;
    height: 70%;
    width: 100%;
    top: 17px;
    padding: 0 16px;
    font-size: 16px;
    outline: none;
    border: none;
    font-family: 'Avenir Opus', sans-serif;
    background-color: transparent;
    box-shadow: none;
    box-sizing: border-box;

    &:focus {
      background: transparent;
    }

    ${props => (props.hasStrip ? hasStripStyle : ``)}

    &:focus + .label {
      font-size: 75%;
      transform: translate3d(0, -30%, 0);
      opacity: 1;
      color: #b4b4b4;
    }

    &:disabled {
      border: solid 1px rgba(18, 18, 18, 0.11);
      background-color: #f5f4f4;
      cursor: not-allowed;
    }

    &:visited {
      background: transparent;
    }
  }
  .icon-after__wrapper {
    position: absolute;
    z-index: 2;
    right: 16px;
    top: 24px;
  }

  .error {
    position: absolute;
    top: 44px;
    padding: 0 16px;
  }

  ${props =>
    props.touched
      ? `.label {
      font-size: 75%;
      transform: translate3d(0, -30%, 0);
      opacity: 1;
      color: #b4b4b4;
    }`
      : ``}

  ${sharedProps};
`;

class Input extends React.Component {
  render() {
    const {
      id,
      icon,
      label,
      htmlFor,
      hasStrip,
      iconSize,
      isInvalid,
      errorMessage,
      value="",
      mb,
      mt,
      ...rest
    } = this.props;
    return (
      <InputContainer
        hasStrip={hasStrip}
        isInvalid={isInvalid}
        touched={Boolean(value)}
        mb={mb}
        mt={mt}
      >
        <Flex>
          <Flex flexDirection="column" className="input-label__wrapper">
            <input {...rest} value={value} id={id} className="input" />
            <label htmlFor={id} className="label">
              {label}
            </label>
          </Flex>
          {icon && (
            <Box className="icon-after__wrapper">
              <Icon
                className="icon-after"
                size={iconSize}
                name={icon}
                color="#929599"
              />
            </Box>
          )}
        </Flex>
        {isInvalid && (
          <Text color="#f66262" fontSize="12px" className="error">
            {errorMessage}
          </Text>
        )}
      </InputContainer>
    );
  }
}

Input.defaultProps = {
  label: 'Label',
  id: 'input',
  errorMessage: 'This field is required',
};

export default Input;
