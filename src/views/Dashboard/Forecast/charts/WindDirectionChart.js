import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartContainer, { dataToChartFormat } from './ChartContainer';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

const getChartOptions = data => {
  return {
    chart: {
      polar: true,
      height: '200px',
    },
    credits: { enabled: false },
    title: null,
    pane: {
      startAngle: 0,
      endAngle: 360,
    },
    xAxis: {
      tickInterval: 45,
      tickmarkPlacement: 'between',
      min: 0,
      max: 360,
      labels: {
        // format: '{value}°',
        formatter: function() {
          if (this.value === 0) {
            return 'N';
          }
          if (this.value === 45) {
            return 'NE';
          }
          if (this.value === 90) {
            return 'E';
          }
          if (this.value === 135) {
            return 'SE';
          }
          if (this.value === 180) {
            return 'S';
          }
          if (this.value === 225) {
            return 'SW';
          }
          if (this.value === 270) {
            return 'W';
          }
          if (this.value === 315) {
            return 'NW';
          }
        },
      },
    },
    yAxis: {
      min: 0,
    },
    plotOptions: {
      series: {
        pointStart: 0,
        pointInterval: 45,
      },
      column: {
        pointPadding: 0,
        groupPadding: 0,
      },
    },
    tooltip: {
      valueSuffix: '°',
      borderRadius: 4,
      borderWidth: 0,
    },
    series: [
      {
        type: 'column',
        name: 'Wind direction',
        data,
        pointPlacement: 'between',
      },
    ],
  };
};

export default function WindDirection({
  hideCard,
  viewDetails,
  windDirectionData,
}) {
  let data = dataToChartFormat(windDirectionData, `#4e7ee8`);
  return (
    <ChartContainer
      width="240px"
      heading="Wind Direction"
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
