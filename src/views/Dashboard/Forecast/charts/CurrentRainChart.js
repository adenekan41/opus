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
      ],
    },
  ],
  plotOptions: {
    column: {
      pointWidth: 30,
      pointPadding: 0.2,
    },
  },
  tooltip: {
    valueSuffix: 'mm',
    borderRadius: 4,
    borderWidth: 0,
  },
  xAxis: {
    categories: ['day', 'storm'],
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
    max: 40,
    title: {
      text: null,
    },
    labels: {
      overflow: 'justify',
      format: '{value} mm',
      style: { color: '#8c8c8c' },
    },
  },
};

export default function CurrentRainChart({ hideCard, viewDetails, data }) {
  return (
    <ChartContainer
      width="280px"
      heading="Current rain"
      hideCard={hideCard}
      viewDetails={viewDetails}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartContainer>
  );
}
