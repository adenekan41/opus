import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'rebass';
import WeatherMap from '../../../components/WeatherMap';
import SelectSearch from '../../../components/SearchInput';

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
    font-size: 10px;
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

export default class ForecastMap extends Component {
  state = { center: [8.7832, 34.5085], zoom: 4 };
  goToBulletinPage = station_name => {
    const { dispatch, history, actions } = this.props;
    dispatch({
      type: actions.UPDATE_WEATHER_STATION_DATA,
      value: station_name,
    }).then(() => {
      history.push(`/dashboard/weather-data/bulletin/${station_name}/charts`);
    });
  };
  getSearchOptions = () => {
    const { weatherStations } = this.props;
    let locations = weatherStations.map(station => ({
      label: `${station.location}`,
      value: `${station.station_name}`,
    }));
    let stations = weatherStations.map(station => ({
      label: `${station.station_name}`,
      value: `${station.station_name}`,
    }));
    return [
      {
        label: 'Stations',
        options: stations,
      },
      {
        label: 'Locations',
        options: locations,
      },
    ];
  };
  findSelectedStation = name => {
    const { weatherStations } = this.props;
    return weatherStations.find(station => station.station_name === name);
  };
  setMapCenter = name => {
    let selectedStation = this.findSelectedStation(name);
    let { latitude, longitude } = selectedStation;
    let center = [latitude, longitude];
    this.setState({
      center,
      zoom: 12,
    });
  };
  render() {
    const { weatherStations } = this.props;
    const { zoom, center } = this.state;
    return (
      <ForecastContainer>
        <div className="SearchInput__wrapper">
          <SelectSearch
            className="SearchInput"
            openMenuOnClick={false}
            options={this.getSearchOptions()}
            onChange={station => this.setMapCenter(station.value)}
          />
        </div>
        <WeatherMap
          zoom={zoom}
          center={center}
          markers={weatherStations}
          goToBulletinPage={this.goToBulletinPage}
        />
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
