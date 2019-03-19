import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartContainer, {
  barCharOptions,
  dataToChartFormat,
} from './ChartContainer';

const getChartOptions = data => ({
  ...barCharOptions,
  series: [
    {
      name: '',
      data,
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
    categories: ['month', 'year'],
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
    max: 160,
    title: {
      text: null,
    },
    labels: {
      overflow: 'justify',
      format: '{value} mm',
      style: { color: '#8c8c8c' },
    },
  },
});

export default function TotalRainChart({
  hideCard,
  viewDetails,
  totalRainData,
}) {
  let data = dataToChartFormat(totalRainData);
  return (
    <ChartContainer
      width="200px"
      heading="Total rain"
      hideCard={hideCard}
      viewDetails={viewDetails}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={getChartOptions(data)}
      />
    </ChartContainer>
  );
}
