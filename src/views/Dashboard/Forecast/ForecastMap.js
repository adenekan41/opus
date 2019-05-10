import React, { Component } from 'react';
import styled from 'styled-components';
import SelectSearch from '../../../components/SearchInput';
import WindyMap from '../../../components/WindyMap';

const ForecastContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  .SearchInput__wrapper {
    position: absolute;
    width: 100%;
    z-index: 1000;

    .SearchInput {
      margin: 40px auto;
      max-width: 500px;
    }
  }
`;

export default class ForecastMap extends Component {
  state = { center: [8.7832, 34.5085], zoom: 4 };

  componentDidMount() {
    const { dispatch, actions } = this.props;
    dispatch({ type: actions.CLEAR_WEATHER_LOGS });
  }

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

  setMap = map => {
    const { dispatch, actions } = this.props;
    dispatch({ type: actions.SET_WINDY_MAP, value: map });
  };

  setMapCenter = name => {
    let selectedStation = this.findSelectedStation(name);
    let { latitude, longitude } = selectedStation;
    let { map } = this.props;
    let center = [latitude, longitude];

    map.setView(center, 12);
  };

  render() {
    const { weatherStations } = this.props;
    const { zoom, center } = this.state;
    return (
      <ForecastContainer>
        <div className="SearchInput__wrapper">
          <SelectSearch
            className="SearchInput"
            openMenuOnClick={true}
            options={this.getSearchOptions()}
            onChange={station => this.setMapCenter(station.value)}
          />
        </div>
        <WindyMap
          zoom={zoom}
          lat={center[0]}
          lon={center[1]}
          setMap={this.setMap}
          markers={weatherStations.map(station => ({
            ...station,
            onClick: () => {
              this.goToBulletinPage(station.station_name);
            },
          }))}
          goToBulletinPage={this.goToBulletinPage}
        />
      </ForecastContainer>
    );
  }
}
