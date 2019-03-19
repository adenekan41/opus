import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartContainer, {
  semiCircleOptions,
  dataToChartFormat,
} from './ChartContainer';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

const getChartOptions = data => {
  return {
    ...semiCircleOptions,
    series: [
      {
        name: 'Wind Speed',
        data,
        dataLabels: {
          format: `<div style="text-align:center"><span style="font-size:25px;color:'black'">{y:.1f}</span><span>%</span></div>`,
        },
        tooltip: {
          valueSuffix: '%',
        },
      },
    ],
  };
};

export default function WindSpeedChart({
  hideCard,
  viewDetails,
  windSpeedData,
}) {
  let data = dataToChartFormat(windSpeedData);
  return (
    <ChartContainer
      width="240px"
      heading="Wind Speed"
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
