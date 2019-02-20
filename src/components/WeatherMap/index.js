import React, { Component } from 'react';
import { Flex, Text } from 'rebass';
import styled from 'styled-components';
import { Map, Marker, Popup, LayersControl } from 'react-leaflet';
import { GoogleLayer } from 'react-leaflet-google';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Button from '../Button';
import 'react-leaflet-markercluster/dist/styles.min.css';

const { BaseLayer } = LayersControl;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;

  .leaflet-container {
    height: 100%;
  }
  .leaflet-popup-content-wrapper {
    border-radius: 4px;
  }
  .leaflet-popup-close-button {
    display: none;
  }
  .leaflet-popup-content {
    width: 250px;
  }
  .leaflet-marker-icon.leaflet-interactive span {
    color: #ffffff !important;
  }
  .marker-cluster-small {
    background-color: rgba(181, 226, 140, 1);
  }
  /* .leaflet-control-container {
    .leaflet-control-zoom {
      display: none;
    }
  } */
`;

const MapMarker = ({
  position,
  goToBulletin,
  map,
  layerContainer,
  temperature,
  humidity,
  dailyRain,
  wind,
  barometer,
  name,
}) => (
  <Marker position={position} map={map} layerContainer={layerContainer}>
    <Popup>
      <Text
        mb="12px"
        fontWeight="bold"
        fontSize="16px"
        style={{ textTransform: 'uppercase' }}
      >
        {name}
      </Text>
      <Flex justifyContent="space-between">
        <Text mb="12px" color="#242424" fontSize="14px">
          Temperature:
        </Text>
        <Text mb="12px" color="rgba(36,36,36,.5)" fontSize="14px">
          {temperature}&deg;C
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text mb="12px" color="#242424" fontSize="14px">
          Humidity:
        </Text>
        <Text mb="12px" color="rgba(36,36,36,.5)" fontSize="14px">
          {humidity}%
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text mb="12px" color="#242424" fontSize="14px">
          Wind:
        </Text>
        <Text mb="12px" color="rgba(36,36,36,.5)" fontSize="14px">
          {wind} mph
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text mb="12px" color="#242424" fontSize="14px">
          Barometer:
        </Text>
        <Text mb="12px" color="rgba(36,36,36,.5)" fontSize="14px">
          {barometer}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text mb="12px" color="#242424" fontSize="14px">
          Daily Rain:
        </Text>
        <Text mb="12px" color="rgba(36,36,36,.5)" fontSize="14px">
          {dailyRain} in
        </Text>
      </Flex>
      <Button size="small" kind="orange" onClick={goToBulletin} width={'100%'}>
        view bulletin
      </Button>
    </Popup>
  </Marker>
);

export default class WeatherMap extends Component {
  goToBulletinPage = () => {
    this.props.history.push('/dashboard/weather-forecast/bulletin');
  };
  render() {
    const { center, zoom, markers } = this.props;
    return (
      <MapContainer>
        <Map center={center} zoom={zoom}>
          <LayersControl position="bottomleft">
            <BaseLayer checked name="Google layer">
              <GoogleLayer
                googlekey={process.env.REACT_APP_GOOGLE_KEY}
                maptype={'ROADMAP'}
              />
            </BaseLayer>
          </LayersControl>

          <MarkerClusterGroup>
            {markers.map((marker, i) => (
              <MapMarker
                key={i}
                {...marker}
                position={[marker.lat, marker.lng]}
                goToBulletin={this.goToBulletinPage}
              />
            ))}
          </MarkerClusterGroup>
        </Map>
      </MapContainer>
    );
  }
}

WeatherMap.defaultProps = {
  markers: [
    {
      lat: 51.5,
      lng: -0.1,
      name: 'LCM Apapa',
      temperature: '32',
      humidity: '92',
      wind: '0',
      barometer: '29.88 in Hg Falling Slowly',
      dailyRain: '0.00',
    },
    {
      lat: 51.51,
      lng: -0.1,
      name: 'LCM Apapa',
      temperature: '32',
      humidity: '92',
      wind: '0',
      barometer: '29.88 in Hg Falling Slowly',
      dailyRain: '0.00',
    },
    {
      lat: 51.49,
      lng: -0.1,
      name: 'LCM Apapa',
      temperature: '32',
      humidity: '92',
      wind: '0',
      barometer: '29.88 in Hg Falling Slowly',
      dailyRain: '0.00',
    },
  ],
};
