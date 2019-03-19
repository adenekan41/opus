import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartContainer, {
  semiCircleOptions,
  dataToChartFormat,
} from './ChartContainer';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

const getChartOptions = data => ({
  ...semiCircleOptions,
  series: [
    {
      name: 'Humidity',
      data,
      dataLabels: {
        format:
          '<div style="text-align:center"><span style="font-size:25px;color:' +
          'black' +
          '">{y:.1f}</span>' +
          '<span>%</span></div>',
      },
      tooltip: {
        valueSuffix: '%',
      },
    },
  ],
});

export default function HumidityChart({ hideCard, viewDetails, humidityData }) {
  let data = dataToChartFormat(humidityData, `#4e7ee8`);
  return (
    <ChartContainer
      width="240px"
      heading="Humidity"
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
