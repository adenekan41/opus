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

  onClick = name => {
    this.props.goToBulletinPage(name);
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

        this.props.setMap(map);

        if (markers.length > 0) {
          for (let i = 0; i < markers.length; i++) {
            var marker = new window.L.marker([
              markers[i].latitude,
              markers[i].longitude,
            ]).addTo(map);
            window.onStationClick = markers[i].onClick;
            marker.bindPopup(
              `
                  <h3>${markers[i].location} (${markers[i].station_name})</h3>
                  <div class="station-data">
                    <p>Temperature:</p>
                    <p>${markers[i].outside_temp}&deg;C</p>
                  </div>
                  <div class="station-data">
                    <p>Humidity:</p>
                    <p>${markers[i].current_humidity}%</p>
                  </div>
                  <div class="station-data">
                    <p>Wind:</p>
                    <p>${markers[i].wind_speed}mph</p>
                  </div>
                  <div class="station-data">
                    <p>Barometer:</p>
                    <p>${markers[i].pressure_in} in. Hg ${
                markers[i].pressure_tendency_string
              }</p>
                  </div>
                  <div class="station-data">
                    <p>Daily Rain:</p>
                    <p>${markers[i].rain_day_in} in</p>
                  </div>
                  <button id="view-bulletin" class="station-data__button" onclick="window.onStationClick()">view bulletin</button>
                  `,
              {
                className: 'pop-up',
                closeButton: false,
                maxWidth: 200,
              }
            );
          }
        }
      }
    );
  };

  render() {
    return <div id="windy" />;
  }
}
