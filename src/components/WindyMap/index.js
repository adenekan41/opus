import React from 'react';
import './style.css';

export default class WindyMap extends React.Component {
  componentDidMount() {
    this.initializeWindy();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.markers.length !== this.props.markers.length) {
      this.initializeWindy();
    }
  }

  initializeWindy = () => {
    const { zoom, lat, lon } = this.props;
    window.windyInit(
      {
        key: 'Q5rNkEUDbzfdFDwuFZKnsH8psCBuVuUm',
        lat,
        lon,
        zoom,
      },
      windyAPI => {
        const { map } = windyAPI;
        const { markers } = this.props;

        this.props.setMap(map);

        if (markers.length > 0) {
          markers.forEach(value => {
            var marker = new window.L.marker([
              value.latitude,
              value.longitude,
            ]).addTo(map);
            marker.bindPopup(
              `
                  <h3>${value.location} (${value.station_name})</h3>
                  <div class="station-data">
                    <p>Temperature:</p>
                    <p>${value.outside_temp}&deg;C</p>
                  </div>
                  <div class="station-data">
                    <p>Humidity:</p>
                    <p>${value.current_humidity}%</p>
                  </div>
                  <div class="station-data">
                    <p>Wind:</p>
                    <p>${value.wind_speed}mph</p>
                  </div>
                  <div class="station-data">
                    <p>Barometer:</p>
                    <p>${value.pressure_in} in. Hg ${
                value.pressure_tendency_string
              }</p>
                  </div>
                  <div class="station-data">
                    <p>Daily Rain:</p>
                    <p>${value.rain_day_in} in</p>
                  </div>
                  <button id="view-bulletin" class="station-data__button" onclick="window.onStationClick('${value.station_name}')">view bulletin</button>
                  `,
              {
                className: 'pop-up',
                closeButton: false,
                maxWidth: 200,
              }
            );
          });
        }
      }
    );
  };

  render() {
    return <div id="windy" />;
  }
}
