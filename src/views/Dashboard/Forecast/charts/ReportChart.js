import React from 'react';
import { Line } from 'react-chartjs-2';
import { getWeatherReportType } from '../../../../helpers/functions';
import { labelStringRegister } from '../../../../helpers/constants';

const ReportChart = ({ type, data, observationTimes }) => {
  let labelString = labelStringRegister[type];
  return (
    <Line
      width={500}
      height={240}
      data={{
        labels: observationTimes,
        datasets: getWeatherReportType(type, data),
      }}
      legend={{
        labels: {
          boxWidth: 40,
        },
      }}
      options={{
        maintainAspectRatio: true,
        elements: {
          point: {radius: 0},
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
              },
              scaleLabel: {
                display: true,
                labelString,
              },
            },
          ],
        },
      }}
    />
  );
};

export default ReportChart;
