import React, { Component } from 'react';
import L from 'leaflet';
import isEqual from 'lodash.isequal';
import { Flex, Text } from 'rebass';
import styled from 'styled-components';
import Control from 'react-leaflet-control';
import { GoogleLayer } from 'react-leaflet-google';
import { Map, Marker, Popup, LayersControl, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Button from '../Button';
import 'react-leaflet-markercluster/dist/styles.min.css';

const pointerIcon = new L.Icon({
  iconUrl: require('../../assets/img/map-marker.svg'),
  iconRetinaUrl: require('../../assets/img/map-marker.svg'),
  popupAnchor: [20, -4],
});

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
  .leaflet-control-layers.leaflet-control {
    display: none;
  }
  .leaflet-top.leaflet-left {
    z-index: 1000000000;
  }
`;

const MapMarker = ({
  position,
  goToBulletin,
  map,
  layerContainer,
  outside_temp,
  current_humidity,
  location,
  wind_speed,
  rain_day_in,
  pressure_in,
  pressure_tendency_string,
  station_name,
}) => (
  <Marker
    position={position}
    map={map}
    layerContainer={layerContainer}
    icon={pointerIcon}
  >
    <Popup>
      <Text
        mb="12px"
        fontWeight="bold"
        fontSize="16px"
        style={{ textTransform: 'uppercase' }}
      >
        {location} ({station_name})
      </Text>
      <Flex justifyContent="space-between">
        <Text mb="12px" color="#242424" fontSize="14px">
          Temperature:
        </Text>
        <Text mb="12px" color="rgba(36,36,36,.5)" fontSize="14px">
          {outside_temp}&deg;C
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text mb="12px" color="#242424" fontSize="14px">
          Humidity:
        </Text>
        <Text mb="12px" color="rgba(36,36,36,.5)" fontSize="14px">
          {current_humidity}%
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text mb="12px" color="#242424" fontSize="14px">
          Wind:
        </Text>
        <Text mb="12px" color="rgba(36,36,36,.5)" fontSize="14px">
          {wind_speed} mph
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text mb="12px" color="#242424" fontSize="14px">
          Barometer:
        </Text>
        <Text mb="12px" color="rgba(36,36,36,.5)" fontSize="14px">
          {pressure_in} in. Hg {pressure_tendency_string}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text mb="12px" color="#242424" fontSize="14px">
          Daily Rain:
        </Text>
        <Text mb="12px" color="rgba(36,36,36,.5)" fontSize="14px">
          {rain_day_in} in
        </Text>
      </Flex>
      <Button
        size="small"
        kind="orange"
        width={'100%'}
        onClick={() => goToBulletin(station_name)}
      >
        view bulletin
      </Button>
    </Popup>
  </Marker>
);

export default class WeatherMap extends Component {
  state = {
    zoom: this.props.zoom,
  };

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.zoom, this.props.zoom)) {
      this.setState({ zoom: this.props.zoom });
    }
  }

  zoomIn = () => this.setState({ zoom: this.state.zoom + 1 });
  zoomOut = () => this.setState({ zoom: this.state.zoom - 1 });

  render() {
    const { center, markers } = this.props;
    const { zoom } = this.state;
    return (
      <MapContainer>
        <Map center={center} zoom={zoom} zoomControl={false}>
          <LayersControl position="bottomleft" collapsed>
            <BaseLayer checked name="Google layer">
              <GoogleLayer
                googlekey={process.env.REACT_APP_GOOGLE_KEY}
                maptype={'ROADMAP'}
              />
              <ZoomControl position="topleft" />
              <Control position="topleft">
                <button onClick={this.zoomIn} style={{display: 'none'}}>Zoom in</button>
                <button onClick={this.zoomOut} style={{display: 'none'}}>Zoom out</button>
              </Control>
            </BaseLayer>
          </LayersControl>

          <MarkerClusterGroup>
            {markers.map((marker, i) => (
              <MapMarker
                key={i}
                {...marker}
                position={[marker.latitude, marker.longitude]}
                goToBulletin={this.props.goToBulletinPage}
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
