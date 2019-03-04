import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { sharedProps } from '../Avatar';

const SearchInputContainer = styled.div`
  height: 50px;
  width: 100%;
  padding: 0 24px;
  border-radius: 5px;
  box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
  background-color: #ffffff;
  box-sizing: border-box;
  ${sharedProps};
  .search-input {
    display: flex;
    align-items: center;

    input {
      border: none;
      box-shadow: none;
      background: transparent;
      outline: none;
      font-size: 16px;
      padding-left: 20px;
      height: 50px;
      flex: 1;
      font-family: 'Avenir Opus', sans-serif;

      &::-webkit-input-placeholder {
        color: #b4b4b4;
        font-weight: 400;
      }

      &::-moz-placeholder {
        color: #b4b4b4;
        font-weight: 400;
      }

      &:-moz-placeholder {
        color: #b4b4b4;
        font-weight: 400;
      }

      &:-ms-input-placeholder {
        color: #b4b4b4;
        font-weight: 400;
      }
    }
  }
`;

export default class SearchInput extends Component {
  render() {
    const { name, type, value, onBlur, onChange, placeholder, ...rest } = this.props;
    return (
      <SearchInputContainer className="SearchInput" {...rest}>
        <div className="search-input">
          <Icon name="search" color="#000000" />
          <input
            name={name}
            type={type}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
        <div className="search-results" />
      </SearchInputContainer>
    );
  }
}

SearchInput.defaultProps = {
  type: 'search',
  placeholder: 'Search for a Location or Weatherstation',
};
