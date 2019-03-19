import React, { Component } from 'react';
import { Box, Flex } from 'rebass';
import { TagButton } from '../../../components/Tags';
import EmptyState from '../../../components/EmptyState';
import emptyStateImage from '../../../assets/img/empty-states/bulletin.png';
import TemperatureChart from './charts/TemperatureChart';
import CurrentRainChart from './charts/CurrentRainChart';
import TotalRainChart from './charts/TotalRainChart';
import HumidityChart from './charts/HumidityChart';
import WindSpeedChart from './charts/WindSpeedChart';
import WindRoseChart from './charts/WindRoseChart';
import WindDirection from './charts/WindDirectionChart';
import BarometerChart from './charts/BarometerChart';

const chartMapping = {
  temperature: { label: 'Temperature', Component: TemperatureChart },
  'current rain': { label: 'Current rain', Component: CurrentRainChart },
  'total rain': { label: 'Total rain', Component: TotalRainChart },
  humidity: { label: 'Humidity', Component: HumidityChart },
  'wind speed': { label: 'Wind speed', Component: WindSpeedChart },
  'wind direction': {
    label: 'Wind direction',
    Component: WindDirection,
  },
  'wind rose': { label: 'Wind rose', Component: WindRoseChart },
  barometer: { label: 'Barometer', Component: BarometerChart },
};
const chartMappingArray = [
  { label: 'Temperature', Component: TemperatureChart },
  { label: 'Current rain', Component: CurrentRainChart },
  { label: 'Total rain', Component: TotalRainChart },
  { label: 'Humidity', Component: HumidityChart },
  { label: 'Wind speed', Component: WindSpeedChart },
  {
    label: 'Wind direction',
    Component: WindDirection,
  },
  { label: 'Wind rose', Component: WindRoseChart },
  { label: 'Barometer', Component: BarometerChart },
];

export default class ForecastCharts extends Component {
  state = {
    charts: chartMapping,
    selectedCharts: chartMappingArray,
  };

  componentDidMount() {
    const { weatherStation, history } = this.props;
    if (Object.values(weatherStation).length === 0) {
      history.push('/dashboard/weather-data/map');
    }
  }

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

  goToReportPage = () => {
    this.props.history.push('/dashboard/weather-data/report');
  };

  render() {
    let { selectedCharts, charts } = this.state;
    let selectedChartsLabels = selectedCharts.map(chart =>
      chart.label.toLowerCase()
    );
    let chartFilter = Object.values(charts).map(item => item.label);
    const { weatherStation } = this.props;
    const {
      heat_index,
      windchill,
      outside_temp,
      dewpoint,
      rain_day_in,
      rain_storm,
      rain_month,
      rain_year,
      current_humidity,
      wind_speed,
      pressure_in,
      wind_degrees,
    } = weatherStation;
    console.log(weatherStation);
    let temperatureChartData = [outside_temp, windchill, heat_index, dewpoint];
    let currentRainData = [rain_day_in, rain_storm];
    let totalRainData = [rain_month, rain_year];
    let windSpeedData = [wind_speed];
    let humidityData = [current_humidity];
    let barometerData = [Number(pressure_in)]
    let windDirectionData = [Number(wind_degrees)]
    return (
      <Box>
        <Flex mb="30px">
          {chartFilter.map((filter, i) => (
            <TagButton
              key={i.toString()}
              style={{ marginRight: '12px' }}
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
                  viewDetails={this.goToReportPage}
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
      </Box>
    );
  }
}
