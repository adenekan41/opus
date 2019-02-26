import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { Flex, Text } from 'rebass';
import { sharedProps } from '../Avatar';

const StyledSelect = styled(Select)`
  .select-inner__control {
    border: none;
    border-radius: 0;
    outline: 0;
    box-shadow: none;
    background-color: transparent;

    &:focus,
    &:hover {
      border-color: transparent;
      box-shadow: none;
    }
  }
  .select-inner__control--is-focused,
  .select-inner__control--menu-is-open {
    border: 0;
    outline: 0;
    border-color: transparent;
    box-shadow: none;
    &:hover {
      border-color: transparent;
      box-shadow: none;
    }
  }
  .select-inner__value-container {
    padding-left: 16px;
    padding-right: 16px;
  }
  .select-inner__menu {
    top: 50px;
  }
  .select-inner__indicator-separator {
    display: none;
  }
  .select-inner__indicators {
    top: -7px;
    position: relative;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  height: 60px;
  box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 3px;
  ${props => (props.isInvalid ? 'border: solid 0.5px #f66262 ' : '')};
  ${props =>
    props.disabled &&
    `
      border: solid 1px rgba(18, 18, 18, 0.11);
      background-color: #f5f4f4;
      cursor: not-allowed;`};

  &:focus-within {
    outline: none;
    border: solid 0.5px rgba(255, 153, 1, 0.8);
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

  .select {
    outline: none;
    border: none;
    font-family: 'Avenir Opus', sans-serif;
    background-color: transparent;
    box-shadow: none;
    box-sizing: border-box;

    &:focus-within + .label {
      font-size: 75%;
      transform: translate3d(0, -30%, 0);
      opacity: 1;
      color: #b4b4b4;
    }
  }

  .select-inner__control {
    position: absolute;
    height: 70%;
    width: 100%;
    top: 17px;
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

const Dropdown = ({
  id,
  isInvalid,
  isDisabled,
  errorMessage,
  label,
  value = '',
  onChange,
  placeholder,
  inputId,
  options,
  mb,
  mt,
  ...rest
}) => {
  return (
    <DropdownContainer
      mb={mb}
      mt={mt}
      disabled={isDisabled}
      touched={Boolean(value)}
    >
      <Flex flexDirection="column">
        <StyledSelect
          id={id}
          value={value}
          inputId={inputId}
          className="select"
          onChange={onChange}
          isDisabled={isDisabled}
          placeholder={placeholder}
          options={options}
          {...rest}
          classNamePrefix="select-inner"
        />
        <label className="label" htmlFor={inputId}>
          {label}
        </label>
      </Flex>
      {isInvalid && (
        <Text color="#f66262" fontSize="12px" className="error">
          {errorMessage}
        </Text>
      )}
    </DropdownContainer>
  );
};

Dropdown.defaultProps = {
  label: 'Label',
  placeholder: '',
};

export default Dropdown;
