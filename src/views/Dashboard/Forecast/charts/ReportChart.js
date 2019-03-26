import React from 'react';
import { Line } from 'react-chartjs-2';
import { getWeatherReportType } from '../../../../helpers/functions';

const ReportChart = ({ type, data }) => {
  return (
    <Line
      width={500}
      height={240}
      data={{
        labels: [
          '00:00',
          '02:00',
          '04:00',
          '06:00',
          '08:00',
          '10:00',
          '12:00',
          '14:00',
          '16:00',
          '18:00',
          '20:00',
          '22:00',
          '00:00',
        ],
        datasets: getWeatherReportType(type, data),
      }}
      legend={{
        labels: {
          boxWidth: 40,
        },
      }}
      options={{
        maintainAspectRatio: true,
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
            },
          ],
        },
      }}
    />
  );
};

export default ReportChart;
