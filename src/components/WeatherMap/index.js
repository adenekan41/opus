import React, { Component } from 'react';
import styled from 'styled-components';
import { Map, Marker, Popup, LayersControl } from 'react-leaflet';
import { GoogleLayer } from 'react-leaflet-google';
import Button from '../Button';

const { BaseLayer } = LayersControl;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;

  .leaflet-container {
    height: 100%;
  }
  /* .leaflet-control-container {
    .leaflet-control-zoom {
      display: none;
    }
  } */
`;

const MapMarker = ({ position, goToBulletin, map, layerContainer }) => (
  <Marker position={position} map={map} layerContainer={layerContainer}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
      <Button size="small" kind="orange">
        view bulletin
      </Button>
    </Popup>
  </Marker>
);

export default class WeatherMap extends Component {
  render() {
    const { center, zoom, markers } = this.props;
    console.log(process.env.REACT_APP_GOOGLE_KEY);
    return (
      <MapContainer>
        <Map center={center} zoom={zoom}>
          <LayersControl position="bottomright">
            <BaseLayer checked name="Google layer">
              <GoogleLayer
                googlekey={process.env.REACT_APP_GOOGLE_KEY}
                maptype={'ROADMAP'}
              />
            </BaseLayer>
          </LayersControl>

          {markers.map((marker, i) => (
            <MapMarker position={[marker.lat, marker.lng]} key={i} />
          ))}
        </Map>
      </MapContainer>
    );
  }
}

WeatherMap.defaultProps = {
  markers: [
    { lat: 51.5, lng: -0.1 },
    { lat: 51.51, lng: -0.1 },
    { lat: 51.49, lng: -0.1 },
  ],
};
