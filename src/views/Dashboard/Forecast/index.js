import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'rebass';
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

  .TemperatureRange__wrapper {
    background: #ffffff;
    position: absolute;
    height: 100vh;
    padding: 40px 16px;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100000;
  }

  .TemperatureRange__bar {
    width: 6px;
    height: 100%;
    border-radius: 4px;
    background-image: linear-gradient(
      to top,
      #29343c,
      #39638d 9%,
      #2682bb 16%,
      #319daf 25%,
      #0cb295 35%,
      #46a145 45%,
      #c0c040 54%,
      #f6b931 68%,
      #dd5724 78%,
      #cb4326 88%,
      #89282b
    );
  }

  .TemperatureRange__values {
    font-size: 12px;
    margin-right: 12px;

    p {
      margin-bottom: 31px;
      &:first-child {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 40px;
      }
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
        <Flex className="TemperatureRange__wrapper">
          <Flex className="TemperatureRange__values" flexDirection="column">
            <p>&#94;</p>
            <p>38&deg;C</p>
            <p>35&deg;C</p>
            <p>30&deg;C</p>
            <p>27&deg;C</p>
            <p>21&deg;C</p>
            <p>15&deg;C</p>
            <p>10&deg;C</p>
            <p>5&deg;C</p>
            <p>0&deg;C</p>
            <p>-7&deg;C</p>
            <p>-12&deg;C</p>
            <p>-18&deg;C</p>
            <p>-23&deg;C</p>
            <p style={{ transform: 'rotate(180deg)' }}>&#94;</p>
          </Flex>
          <Box className="TemperatureRange__bar" />
        </Flex>
      </ForecastContainer>
    );
  }
}
