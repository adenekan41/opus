import React from 'react';
import './style.css';

export default class WindyMap extends React.Component {
  componentDidMount() {
    this.initializeWindy();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.markers.length !== this.props.markers.length) {
      console.log(this.props.markers);
      this.initializeWindy();
    }
  }

  onClick = () => {
    console.log('hello');
  };

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
        const { map, store } = windyAPI;
        const { markers } = this.props;
        const levels = store.getAllowed('availLevels');
        var i = 0;

        this.props.setMap(map)

        setInterval(() => {
          i = i === levels.length - 1 ? 0 : i + 1;
          store.set('level', levels[i]);
        }, 500);

        store.on('level', level => {
          console.log(`Level was changed: ${level}`);
        });

        if (markers.length > 0) {
          markers.forEach(station => {
            var marker = new window.L.marker([
              station.latitude,
              station.longitude,
            ]).addTo(map);
            marker.bindPopup(
              `
                  <h3>${station.location} (${station.station_name})</h3>
                  <div class="station-data">
                    <p>Temperature:</p>
                    <p>${station.outside_temp}&deg;C</p>
                  </div>
                  <div class="station-data">
                    <p>Humidity:</p>
                    <p>${station.current_humidity}%</p>
                  </div>
                  <div class="station-data">
                    <p>Wind:</p>
                    <p>${station.wind_speed}mph</p>
                  </div>
                  <div class="station-data">
                    <p>Barometer:</p>
                    <p>${station.pressure_in} in. Hg ${
                station.pressure_tendency_string
              }</p>
                  </div>
                  <div class="station-data">
                    <p>Daily Rain:</p>
                    <p>${station.rain_day_in} in</p>
                  </div>
                  <button class="station-data__button" onclick="this.onClick()">view bulletin</button>
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
