import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: ${props => props.mb};

  .Icon {
    position: absolute;
    z-index: 2;
    top: 16px;
    left: 14px;
  }

  input {
    outline: none;
    position: relative;
    width: 100%;
    height: 50px;
    width: 100%;
    padding: 0 40px;
    border-radius: 5px;
    border: none;
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
    background-color: #ffffff;
    box-sizing: border-box;
    font-family: "Avenir Opus", sans-serif;
  }
`;

const SearchInput = ({ value, placeholder, className, onChange, ...rest }) => {
  return (
    <SearchContainer className={className} mb={rest.mb}>
      <Icon name="search" color="#000000" />
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </SearchContainer>
  );
};

SearchInput.defaultProps = {
  placeholder: "Search for WeatherStation",
  onChange: () => {},
};

export default SearchInput;
