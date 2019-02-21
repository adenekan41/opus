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
      data: [{ y: 50, color: '#3c464c' }],
      dataLabels: {
        format: `<div style="text-align:center"><span style="font-size:25px;color:'black'">{y:.1f}</span><span>%</span></div>`,
      },
      tooltip: {
        valueSuffix: '%',
      },
    },
  ],
};

export default function WindSpeedChart({ hideCard, viewDetails, data }) {
  return (
    <ChartContainer
      width="240px"
      heading="Wind Speed"
      hideCard={hideCard}
      viewDetails={viewDetails}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartContainer>
  );
}
