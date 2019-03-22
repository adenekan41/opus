import React from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import Select from 'react-select';

const SelectSearchContainer = styled.div`
  position: relative;
  .Icon {
    position: absolute;
    z-index: 2;
    top: 16px;
    left: 20px;
  }
  .select-search-container {
    position: relative;
    width: 100%;
    height: 50px;
    width: 100%;
    padding: 0 40px;
    border-radius: 5px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
    background-color: #ffffff;
    box-sizing: border-box;
  }
  .select-search__control {
    border: none;
    position: relative;
    top: 6px;
  }
  .select-search__control--is-focused {
    border: none;
    box-shadow: none;
  }
  .select-search__indicators {
    display: none;
  }
  .select-search__menu {
    position: absolute;
    left: 0;
    right: 0;
    border: none;
    margin-top: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
  }
  .select-search__menu-list {
    margin-top: 0;
  }
  .select-search__option {
    background-color: transparent;
  }
  .select-search__option:active,
  .select-search__option--is-focused {
    background-color: #fbfbfb;
  }
  .select-search__option--is-selected {
    color: #000;
  }
`;

const DropdownIndicator = () => {
  return null;
};


const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
  </div>
);

export const SelectSearch = ({ options, placeholder, className, onChange, isGrouped, ...rest }) => {
  let groupedProps = isGrouped ? {formatGroupLabel} : {};
  return (
    <SelectSearchContainer className={className}>
      <Icon name="search" color="#000000" />
      <Select
        {...rest}
        {...groupedProps}
        options={options}
        isClearable={false}
        placeholder={placeholder}
        onChange={onChange}
        className="select-search-container"
        classNamePrefix="select-search"
        components={{ DropdownIndicator }}
      />
    </SelectSearchContainer>
  );
};

SelectSearch.defaultProps = {
  options: [{ label: 'Kola', value: 'Kola' }, { label: 'John', value: 'John' }],
  placeholder: 'Search for WeatherStation',
};

export default SelectSearch;
