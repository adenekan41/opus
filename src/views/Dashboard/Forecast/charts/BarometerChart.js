import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartContainer from './ChartContainer';

const getChartOpitons = data => ({
  chart: {
    type: 'area',
    height: '200px'
  },
  title: {
    text: null,
  },
  credits: { enabled: false },
  xAxis: {
    // min: 14,
    // max: 19,
    allowDecimals: false,
    labels: {
      formatter: function() {
        return `${this.value}:00`;
      },
      style: {color: '#242424'}
    },
  },
  yAxis: {
    // min: 0,
    // max: 1031,
    allowDecimals: true,
    title: {
      text: null,
    },
    labels: {
      formatter: function() {
        return this.value / 1000 + '.0hPa';
      },
      style: {color: '#8c8c8c'}
    },
  },
  tooltip: {
    pointFormat:
      '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}',
  },
  plotOptions: {
    area: {
      pointStart: 1940,
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 2,
        states: {
          hover: {
            enabled: true,
          },
        },
      },
    },
  },
  series: [
    {
      name: '',
      data
    },
  ],
});

export default function BarometerChart({ hideCard, viewDetails, barometerData }) {
  let newOptions = getChartOpitons(barometerData)
  return (
    <ChartContainer
      width="400px"
      heading="Barometer"
      hideCard={hideCard}
      viewDetails={viewDetails}
    >
      <HighchartsReact highcharts={Highcharts} options={newOptions} />
    </ChartContainer>
  );
}
