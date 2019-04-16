import React from 'react';
import CheckboxSelectOption from './Options';
import Dropdown from '../Select';

const CheckboxSelect = ({ options, ...rest }) => {
  return (
    <Dropdown
      {...rest}
      value={true}
      options={options}
      components={{ Option: CheckboxSelectOption }}
      defaultValue={`${rest.selected.length} Selected`}
    />
  );
};

export default CheckboxSelect;
