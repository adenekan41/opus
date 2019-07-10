import React, { Component } from "react";
import styled from "styled-components";
import { Flex, Heading, Text } from "rebass";
import uniqBy from "lodash.uniqby";
import SearchInput from "../../../../../components/Search";
import WindyMap from "../../../../../components/WindyMap";
import Card from "../../../../../components/Card";
import { Icon } from "../../../../../components/Icon";
import Button from "../../../../../components/Button";
import SelectSearch from "../../../../../components/SelectSearchInput";

const CustomerForecastContainer = styled.div`
  padding: 20px 0px;
  position: relative;
  width: 100%;
  height: calc(100vh - 400px);

  .SearchInput__wrapper {
    position: absolute;
    width: 100%;
    z-index: 1000;

    .SearchInput {
      margin: 40px auto;
      max-width: 500px;
    }
  }

  .station_name {
    height: 100%;
    .station_name_details {
      padding: 1.5rem;
      border-top: 1px solid #f5f6fa;

      button {
        height: 24px;
        padding: 0 10px;
        background-color: #fafafa;
      }

      p {
        margin: 0;
      }
    }
  }
`;



const getUserWeatherStations = (
  userWeatherStations,
  weatherStations
) => {
  let weatherLinkStations = weatherStations;
  let userWeatherStationNames = userWeatherStations.map(s => s.station_name);
  let stations = weatherLinkStations.filter(station =>
    !userWeatherStationNames.includes(station.station_name)
  );
  return uniqBy(stations, "station_name")
};

export default class CustomerForecastMap extends Component {
  state = {
    center: [8.7832, 34.5085],
    zoom: 3,
    customerWeatherStations: this.props.customerWeatherStations || [],
  };

  getSearchOptions = () => {
    const { weatherStations } = this.props;
    const { customerWeatherStations } = this.state;

    let stations = getUserWeatherStations(
      customerWeatherStations,
      weatherStations
    ).map(station => ({
      label: `${station.station_name}`,
      value: `${station.station_name}`,
    }));

    return [
      {
        label: "Stations",
        options: stations,
      },
    ];
  };

  findSelectedStation = name => {
    const { weatherStations } = this.props;
    const { customerWeatherStations } = this.state;
    return getUserWeatherStations(
      customerWeatherStations,
      weatherStations
    ).find(station => station.station_name === name);
  };

  setMap = map => {
    const { dispatch, actions } = this.props;
    dispatch({ type: actions.SET_WINDY_MAP, value: map });
  };

  setMapCenter = name => {
    let selectedStation = this.findSelectedStation(name);
    let { latitude, longitude, station_name } = selectedStation;
    let { map } = this.props;
    let center = [latitude, longitude];

    this.setState(({ customerWeatherStations }) => ({
      customerWeatherStations: [{ station_name }, ...customerWeatherStations],
    }));

    map.setView(center, 12);
  };

  removeCustomerWeatherStation = index => {
    this.setState(({ customerWeatherStations }) => ({
      customerWeatherStations: customerWeatherStations.filter(
        (weatherStation, i) => i !== index
      ),
    }));
  };

  render() {
    const { zoom, center, customerWeatherStations } = this.state;
    const { weatherStations, renderButtons } = this.props;

    return (
      <CustomerForecastContainer>
        <div className="row">
          <div className="col-md-3 pr-0">
            <Card className="station_name">
              <SearchInput placeholder="Search Stations" />
              {customerWeatherStations.length > 0 ? (
                customerWeatherStations.map((weatherStation, i) => (
                  <div className="station_name_details" key={i}>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Flex alignItems="center">
                        <Icon name="station" color="#000" />
                        <Text ml={2}>{weatherStation.station_name}</Text>
                      </Flex>
                      <Button
                        kind="ghost"
                        onClick={() => this.removeCustomerWeatherStation(i)}
                      >
                        <Icon name="trash" color="#8c8c8c" />
                      </Button>
                    </Flex>
                  </div>
                ))
              ) : (
                <Flex
                  mt={5}
                  px={4}
                  alignItems="center"
                  justifyContent="flex"
                  flexDirection="column"
                >
                  <Heading
                    mb={2}
                    fontSize={18}
                    fontWeight={500}
                    textAlign="center"
                  >
                    No weather stations for customer
                  </Heading>
                  <Text textAlign="center" color="#8c8c8c" fontSize={15}>
                    Search and Select Station from the map
                  </Text>
                </Flex>
              )}
            </Card>
          </div>
          <div className="col-md pl-0">
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
              height={"70vh"}
              lat={center[0]}
              lon={center[1]}
              setMap={this.setMap}
              markers={getUserWeatherStations(customerWeatherStations, weatherStations)}
            />
          </div>
        </div>
        {renderButtons(customerWeatherStations)}
      </CustomerForecastContainer>
    );
  }
}

CustomerForecastMap.defaultProps = {
  renderButtons: weatherStations => {
    return (
      <Button
        kind="orange"
        width="300px"
        mb="8px"
        onClick={() => console.log(weatherStations)}
      >
        Save Changes
      </Button>
    );
  },
};
