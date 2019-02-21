import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartContainer, { semiCircleOptions } from './ChartContainer';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

const options = {
  ...semiCircleOptions,

  series: [
    {
      name: 'Wind Speed',
      data: [{ y: 0, color: '#3c464c' }],
      dataLabels: {
        format:
          '<div style="text-align:center"><span style="font-size:25px;color:' +
          'black' +
          '">{y}</span><br/>' +
          '<span>W/m2</span></div>',
      },
      tooltip: {
        valueSuffix: '%',
      },
    },
  ],
};

export default function SunsetChart({ hideCard, viewDetails, data }) {
  return (
    <ChartContainer
      width="240px"
      heading="Sunset"
      hideCard={hideCard}
      viewDetails={viewDetails}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartContainer>
  );
}
