import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartContainer, { barCharOptions } from './ChartContainer';

const options = {
  ...barCharOptions,
  series: [
    {
      name: '',
      data: [
        { y: 26 },
        { y: 10, color: '#3c464c' },
        20,
        { y: 15, color: '#3c464c' },
      ],
    },
  ],
  plotOptions: {
    column: {
      pointWidth: 70,
      pointPadding: 0.5,
    },
  },
  tooltip: {
    valueSuffix: '\u2103',
    borderRadius: 4,
    borderWidth: 0,
  },
  xAxis: {
    categories: ['outside temp', 'wind chill', 'heat index', 'dew point'],
    title: {
      text: null,
    },
    labels: {
      overflow: 'justify',
      style: { color: '#242424' },
    },
  },
  yAxis: {
    min: 0,
    max: 50,
    title: {
      text: null,
    },
    labels: {
      overflow: 'justify',
      format: '{value} \u2103',
      style: { color: '#8c8c8c' },
    },
  },
};

export default function TemperatureChart({ hideCard, viewDetails, data }) {
  return (
    <ChartContainer
      width="400px"
      heading="Temperature"
      hideCard={hideCard}
      viewDetails={viewDetails}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartContainer>
  );
}
