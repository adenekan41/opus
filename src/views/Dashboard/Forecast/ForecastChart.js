import React, { Component } from "react";
import { Box, Flex } from "rebass";
import moment from "moment";
import { TagButton } from "../../../components/Tags";
import EmptyState from "../../../components/EmptyState";
import emptyStateImage from "../../../assets/img/empty-states/bulletin.png";
import TemperatureChart from "./charts/TemperatureChart";
import CurrentRainChart from "./charts/CurrentRainChart";
import TotalRainChart from "./charts/TotalRainChart";
import HumidityChart from "./charts/HumidityChart";
import WindSpeedChart from "./charts/WindSpeedChart";
import WindDirection from "./charts/WindDirectionChart";
import BarometerChart from "./charts/BarometerChart";
import { convertStringToNumber } from "../../../helpers/functions";
import { Spinner } from "../../../components/Spinner";

const chartMapping = {
  temperature: { label: "Temperature", Component: TemperatureChart },
  "current rain": { label: "Current rain", Component: CurrentRainChart },
  "total rain": { label: "Total rain", Component: TotalRainChart },
  humidity: { label: "Humidity", Component: HumidityChart },
  "wind speed": { label: "Wind speed", Component: WindSpeedChart },
  "wind direction": {
    label: "Wind direction",
    Component: WindDirection,
  },
  barometer: { label: "Barometer", Component: BarometerChart },
};
const chartMappingArray = [
  { label: "Temperature", Component: TemperatureChart },
  { label: "Current rain", Component: CurrentRainChart },
  { label: "Total rain", Component: TotalRainChart },
  { label: "Humidity", Component: HumidityChart },
  { label: "Wind speed", Component: WindSpeedChart },
  {
    label: "Wind direction",
    Component: WindDirection,
  },
  { label: "Barometer", Component: BarometerChart },
];

export default class ForecastCharts extends Component {
  state = {
    charts: chartMapping,
    loading: false,
    start_date: moment(new Date()).subtract(1, 'days').format("M/D/YYYY"),
    end_date: moment(new Date()).format("M/D/YYYY"),
    selectedCharts: chartMappingArray,
  };

  componentDidMount() {
    const { weatherStation, history, weatherStationLogs } = this.props;
    if (Object.values(weatherStation).length === 0) {
      history.push("/dashboard/weather-data/map");
    }
    if (weatherStationLogs.length === 0) {
      this.getWeatherStationData(weatherStation.station_name);
    }
  }

  getWeatherStationData = station_name => {
    const { dispatch, actions } = this.props;
    const { start_date, end_date } = this.state;
    this.setState({ loading: true });
    dispatch({
      type: actions.GET_WEATHER_STATION_DATA,
      value: { station_name, start_date, end_date },
    }).then(() => {
      this.setState({ loading: false });
    });
  };

  addToSelectedCharts = chart => {
    let chartToAdd = this.state.charts[chart];
    this.setState(({ selectedCharts }) => ({
      selectedCharts: [chartToAdd, ...selectedCharts],
    }));
  };

  removeFromSelectedCharts = chart => {
    let lowercaseValue = chart.toLowerCase();
    this.setState(({ selectedCharts }) => ({
      selectedCharts: selectedCharts.filter(
        chart => chart.label.toLowerCase() !== lowercaseValue
      ),
    }));
  };

  onChartFilterClick = chart => {
    let { selectedCharts } = this.state;
    let lowercaseValue = chart.toLowerCase();
    let selectedChartsLabels = selectedCharts.map(chart =>
      chart.label.toLowerCase()
    );
    if (selectedChartsLabels.includes(lowercaseValue)) {
      this.removeFromSelectedCharts(chart);
    } else {
      this.addToSelectedCharts(chart);
    }
  };

  goToReportPage = (station_name, type) => {
    const { dispatch, actions } = this.props;
    dispatch({ type: actions.UPDATE_WEATHER_TYPE, value: type });
    this.props.history.push(`/dashboard/weather-data/${station_name}/report`);
  };

  render() {
    let { selectedCharts, charts } = this.state;
    let selectedChartsLabels = selectedCharts.map(chart =>
      chart.label.toLowerCase()
    );
    let chartFilter = Object.values(charts).map(item => item.label);
    const { weatherStation } = this.props;
    const {
      observation_time,
      barometer_hpa,
      temp_c,
      high_temp_c,
      low_temp_c,
      dew_point_c,
      wet_bulb_c,
      wind_speed_m_s,
      wind_direction,
      wind_run_m,
      wind_chill_c,
      heat_index_c,
      rain_mm,
      rain_year,
      rain_month,
      rain_storm,
      rain_rate_mm_h,
      wind_degrees,
      ...rest
    } = weatherStation;
    let temperatureChartData = [
      temp_c || "0",
      wind_chill_c || "0",
      heat_index_c || "0",
      dew_point_c || "0",
    ];
    let currentRainData = [rain_rate_mm_h || "0", rain_storm || "0"];
    let totalRainData = [rain_month || "0", rain_year || "0"];
    let windSpeedData = [wind_speed_m_s || "0"];
    let humidityData = [rest["hum_%"] || "0"];
    let barometerData = [barometer_hpa];
    let windDirectionData = [convertStringToNumber(wind_degrees)];
    return (
      <Box>
        {this.state.loading ? (
          <Flex alignItems="center" justifyContent="center" py="30vh">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex mb="30px">
              {chartFilter.map((filter, i) => (
                <TagButton
                  key={i.toString()}
                  style={{ marginRight: "12px" }}
                  isActive={selectedChartsLabels.includes(filter.toLowerCase())}
                  onClick={() => this.onChartFilterClick(filter.toLowerCase())}
                >
                  {filter}
                </TagButton>
              ))}
            </Flex>
            {selectedCharts.length > 0 ? (
              <Flex flexWrap="wrap">
                {selectedCharts.map(({ Component, label }, i) => (
                  <Box key={`${label}-${i}`}>
                    <Component
                      hideCard={() => this.removeFromSelectedCharts(label)}
                      viewDetails={() =>
                        this.goToReportPage(weatherStation.station_name, label)
                      }
                      {...{
                        humidityData,
                        barometerData,
                        windSpeedData,
                        totalRainData,
                        currentRainData,
                        windDirectionData,
                        temperatureChartData,
                      }}
                    />
                  </Box>
                ))}
              </Flex>
            ) : (
              <EmptyState
                image={emptyStateImage}
                margin="80px"
                heading="No Charts"
                helpText="You haven’t selected any charts, to view a chart
          please click on any of the filters above
          to enable it."
              />
            )}
          </>
        )}
      </Box>
    );
  }
}
