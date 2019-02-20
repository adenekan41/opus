import React, { Component } from 'react';
import styled from 'styled-components';
import WeatherMap from '../../../components/WeatherMap';
import SearchInput from '../../../components/SearchInput';

const ForecastContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  .SearchInput__wrapper {
    position: absolute;
    width: 100%;
    z-index: 100000;

    .SearchInput {
      margin: 40px auto;
      max-width: 500px;
    }
  }
`;

export default class Forecast extends Component {
  render() {
    return (
      <ForecastContainer>
        <div className="SearchInput__wrapper">
          <SearchInput />
        </div>
        <WeatherMap zoom={10} center={[51.5, -0.1]} />
      </ForecastContainer>
    );
  }
}
