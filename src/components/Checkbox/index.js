import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

const StyledCheckbox = styled(Box)`
  display: flex;
  align-items: center;
  .custom-checkbox {
    display: inline-block;
    vertical-align: top;
    margin: 0 6px 0 0;
    width: ${props => props.size || '18px'};
    height: ${props => props.size || '18px'};
    background: #fff;
    border: 1px solid #979797;
    position: relative;
    border-radius: 2px;
    background: #29cb98;
    transition: box-shadow 180ms ease;
    box-shadow: inset 0 0 0 12px #fff;
    top: -2px;
  }

  label {
    display: flex;
    align-items: center;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    margin: 0;
  }

  input[type='checkbox'] {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    width: ${props => props.size || '18px'};
    height: ${props => props.size || '18px'};
    visibility: hidden;
  }

  input[type='checkbox']:checked + .custom-checkbox {
    box-shadow: inset 0 0 0 2px #fff;
  }
`;

const Checkbox = ({
  id = '',
  value,
  name,
  onBlur,
  checked,
  children,
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <StyledCheckbox {...rest}>
      <label>
        <input
          id={id}
          name={name}
          value={value}
          onBlur={onBlur}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          placeholder={placeholder}
        />
        <span className="custom-checkbox" />
        <span className="checkbox-text">{children}</span>
      </label>
    </StyledCheckbox>
  );
};

export default Checkbox;
