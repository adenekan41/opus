import React from "react";
import Select from "react-select";
import { Flex, Text } from "rebass";
import styled from "styled-components";
import { sharedProps } from "../Avatar";

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
    z-index: 100000000;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
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
  border: solid 0.5px rgba(18, 18, 18, 0.11);
  ${props => (props.isInvalid ? "border: solid 0.5px #f66262 " : "")};
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

    &__required {
      color: #f66262;
      font-size: 12px;
    }
  }

  .select {
    outline: none;
    border: none;
    font-family: "Avenir Opus", sans-serif;
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

function getValueWithLabel(value, options) {
  if (value && value.hasOwnProperty("label")) {
    return value;
  }
  return options.find(x => x.value === value);
}

const Dropdown = ({
  id,
  isInvalid,
  isDisabled,
  errorMessage,
  label,
  value = "",
  onChange,
  placeholder,
  inputId,
  options,
  isRequired,
  mb,
  mt,
  width,
  ...rest
}) => {
  return (
    <DropdownContainer
      mb={mb}
      mt={mt}
      width={width}
      isInvalid={isInvalid}
      disabled={isDisabled}
      touched={Boolean(value)}
    >
      <Flex flexDirection="column">
        <StyledSelect
          id={id}
          value={getValueWithLabel(value, options)}
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
          {label} {isRequired && <span className="label__required">*</span>}
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
  label: "Label",
  placeholder: "",
  options: [],
};

export default Dropdown;
