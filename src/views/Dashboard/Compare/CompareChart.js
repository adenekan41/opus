import React from 'react';
import { Line } from 'react-chartjs-2';

const CompareChart = ({ data, labelString, observationTimes }) => {
  return (
    <Line
      width={500}
      height={240}
      data={{
        labels: observationTimes,
        datasets: data,
      }}
      legend={{
        labels: {
          boxWidth: 40,
        },
      }}
      options={{
        maintainAspectRatio: true,
        elements: {
          point: { radius: 0 },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                maxRotation: 90,
                minRotation: 90,
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

export default CompareChart;
