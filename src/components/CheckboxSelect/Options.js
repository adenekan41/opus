import React from 'react';
import { Text, Flex } from 'rebass';
import styled from 'styled-components';
import Checkbox from '../Checkbox';

const Container = styled(Flex)`
  padding: 15px;
  background: ${props => (props.isSelected ? `#fbfbfb` : `#ffffff`)};
  border-top: 1px solid #e6e6e6;
  cursor: pointer;

  &:hover {
    background-color: #fbfbfb;
  }
`;

const CheckboxSelectOption = ({ value, selectProps, children }) => {
  let isChecked = selectProps.selected.includes(value);
  let [checked, setChecked] = React.useState(isChecked);
  return (
    <Container
      alignItems="center"
      justifyContent="space-between"
      isSelected={checked}
    >
      <Text>{children}</Text>
      <Checkbox
        size="12px"
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          selectProps.onChange(value);
        }}
      />
    </Container>
  );
};

CheckboxSelectOption.defaultProps = {
  isSelected: false,
};

export default CheckboxSelectOption;
