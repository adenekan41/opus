import React from 'react';
import { Text } from 'rebass';
import styled from 'styled-components';
import CheckboxSelectOption from './Options';
import Dropdown from '../Select';

const StyledCheckboxSelect = styled.div`
  position: relative;

  .select-inner__input {
    opacity: 0 !important;
  }

  .selected-count__text {
    display: inline-block;
    position: absolute;
    top: 28px;
    left: 16px;
  }
`;

const CheckboxSelect = ({ options, ...rest }) => {
  return (
    <StyledCheckboxSelect>
      <Dropdown
        {...rest}
        value={true}
        placeholder=""
        options={options}
        components={{ Option: CheckboxSelectOption }}
        defaultValue={`${rest.selected.length} Selected`}
      />
      <Text className="selected-count__text">{`${
        rest.selected.length
      } Selected`}</Text>
    </StyledCheckboxSelect>
  );
};

export default CheckboxSelect;
