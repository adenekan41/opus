import React, { Component } from 'react';
import styled from 'styled-components';
import SearchInput from '../../../../../components/Search';
import WindyMap from '../../../../../components/WindyMap';
import Card from '../../../../../components/Card'
const CustomerForecastContainer = styled.div`
 padding: 20px 0px;
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
  .station_name {
      min-height:100vh;
      p{
          padding:1.5rem;
          border-top:1px solid #f5f6fa;
          margin:0;
          i.ion-ios-trash-outline{
            float: right;
            font-size: 20px;
            cursor: pointer;
          }
      }
      .Search_Input{
            padding:.4rem;
            box-shadow: none !important;
          .select-search-container{
            box-shadow: none !important;
          }
      }
  }
`;

export default class CustomerForecastMap extends Component {
  state = { 
      center: [8.7832, 34.5085], 
      zoom: 4 ,
      weatherStations:[
          {
              location:32.333333,
              station_name: 'Adenekan Station'
          }
      ]
    };

  componentDidMount() {
    // const { dispatch, actions } = this.props;
    // dispatch({ type: actions.CLEAR_WEATHER_LOGS });
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
    const { weatherStations } = this.state;
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
    const { weatherStations } = this.state;
    return weatherStations.find(station => station.station_name === name);
  };

  setMap = map => {
    // const { dispatch, actions } = this.props;
    // dispatch({ type: actions.SET_WINDY_MAP, value: map });
  };

  setMapCenter = name => {
    let selectedStation = this.findSelectedStation(name);
    let { latitude, longitude } = selectedStation;
    let { map } = this.props;
    let center = [latitude, longitude];

    map.setView(center, 12);
  };

  render() {
    const { weatherStations } = this.state;
    const { zoom, center } = this.state;

    window.onStationClick = station => this.goToBulletinPage(station);

    return (
      <CustomerForecastContainer>
        <div className="row">
            <div className="col-md-3 pr-0">
                <Card className="station_name">
                    <SearchInput
                        className="Search_Input"
                        placeholder="Search Stations"
                    />
                    <div className="station_name_details">
                        <p><i className="ion-pin mr-3"></i>Osun South 029 <i className="ion-ios-trash-outline"></i></p> 
                    </div>
                    <div className="station_name_details">
                        <p><i className="ion-pin mr-3"></i>Osun South 029 <i className="ion-ios-trash-outline"></i></p> 
                    </div>
                </Card>
            </div>
            <div className="col-md pl-0">
                <div className="SearchInput__wrapper">
                    <SearchInput
                        className="SearchInput"
                        onChange={station => this.setMapCenter(station.value)}
                    />
                    </div>
                    <WindyMap
                    zoom={zoom}
                    lat={center[0]}
                    lon={center[1]}
                    setMap={this.setMap}
                    markers={weatherStations}
                    />
                </div>
        </div>
      </CustomerForecastContainer>
    );
  }
}
