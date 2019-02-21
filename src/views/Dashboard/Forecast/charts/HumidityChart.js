import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartContainer, { semiCircleOptions } from './ChartContainer';
require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/solid-gauge")(Highcharts);

const options = {
  ...semiCircleOptions,
};

export default function HumidityChart({ hideCard, viewDetails, data }) {
  return (
    <ChartContainer
      width="240px"
      heading="Humidity"
      hideCard={hideCard}
      viewDetails={viewDetails}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartContainer>
  );
}
