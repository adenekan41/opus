import React from "react";
import "./style.css";

export default class WindyMap extends React.Component {
  componentDidMount(e) {
    this.initializeWindy(e);
  }

  handleTest = e => {
    const { map } = this.props;
    e.stopPropagation();
    if (e.which === 187 && e.ctrlKey) {
      map.zoomIn(1)
    }
    if (e.which === 189 && e.ctrlKey) {
      map.zoomOut(1)
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.markers.length !== this.props.markers.length) {
      this.initializeWindy();
    }
  }

  initializeWindy = () => {
    const { zoom, lat, lon } = this.props;
    window.windyInit(
      {
        key: "Q5rNkEUDbzfdFDwuFZKnsH8psCBuVuUm",
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
            marker
              .bindPopup(
                `
                  <h3>${value.location} (${value.station_name})</h3>
                  <div class="station-data">
                    <p>Temperature:</p>
                    <p>${value.temp_c ? `${value.temp_c} &deg;C` : "N/A"}</p>
                  </div>
                  <div class="station-data">
                    <p>Humidity:</p>
                    <p>${value["hum_%"] ? `${value["hum_%"]} %` : "N/A"}</p>
                  </div>
                  <div class="station-data">
                    <p>Wind:</p>
                    <p>${
                      value.wind_speed_m_s
                        ? `${value.wind_speed_m_s} mph`
                        : "N/A"
                    }</p>
                  </div>
                  <div class="station-data">
                    <p>Barometer:</p>
                    <p>${
                      value.barometer_hpa
                        ? `${value.barometer_hpa} in. Hg`
                        : "N/A"
                    } </p>
                  </div>
                  <div class="station-data">
                    <p>Daily Rain:</p>
                    <p>${value.rain_mm ? `${value.rain_mm} in` : "N/A"}</p>
                  </div>
                  <button id="view-bulletin" class="station-data__button" onclick="window.onStationClick('${
                    value.station_name
                  }')">view bulletin</button>
                  `,
                {
                  className: "pop-up",
                  closeButton: false,
                  maxWidth: 200,
                }
              )
              .bindTooltip(`${value.station_name}`, {
                permanent: true,
                direction: "top",
              });
          });
        }
      }
    );
  };

  render() {
    return (
      <div
        id="windy"
        tabIndex="0"
        style={{
          height: this.props.height || "100vh",
        }}
        onKeyDown={e => this.handleTest(e)}
      />
    );
  }
}
