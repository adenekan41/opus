import React, { Component } from 'react';
import { Box, Flex } from 'rebass';
import { TagButton } from '../../../components/Tags';
import EmptyState from '../../../components/EmptyState';
import emptyStateImage from '../../../assets/img/empty-states/bulletin.png';

const chartMapping = {
  temperature: { label: 'Temperature', Component: <div>temperature</div> },
  'current rain': { label: 'Current rain', Component: <div>Current rain</div> },
  'total rain': { label: 'Total rain', Component: <div>Total rain</div> },
  humdity: { label: 'Humdity', Component: <div>Humdity</div> },
  'wind speed': { label: 'Wind speed', Component: <div>Wind speed</div> },
  'wind direction': {
    label: 'Wind direction',
    Component: <div>Wind direction</div>,
  },
  'wind rose': { label: 'Wind rose', Component: <div>Wind rose</div> },
  barometer: { label: 'Barometer', Component: <div>Barometer</div> },
  sunset: { label: 'Sunset', Component: <div>Sunset</div> },
  'moon phase': { label: 'Moon phase', Component: <div>Moon phase</div> },
};

export default class ForecastCharts extends Component {
  state = {
    charts: chartMapping,
    selectedCharts: [],
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

  render() {
    let { selectedCharts, charts } = this.state;
    let selectedChartsLabels = selectedCharts.map(chart =>
      chart.label.toLowerCase()
    );
    let chartFilter = Object.values(charts).map(item => item.label);
    return (
      <Box>
        <Flex>
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
          <Flex>
            {selectedCharts.map(({ Component, label }, i) => (
              <Box key={`${label}-${i}`}>{Component}</Box>
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
