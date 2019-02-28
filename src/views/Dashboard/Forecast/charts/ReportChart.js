import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default class ReportChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        credits: { enabled: false },
        chart: {
          type: 'spline',
        },
        title: {
          text: null,
        },
        yAxis: {
          title: {
            text: 'Temperature (°F)',
          },
        },
        xAxis: {
          type: 'datetime',
          plotLines: [
            {
              value: '',
              dashStyle: 'dash',
              width: 1,
              color: '#d33',
            },
          ],
        },
        tooltip: {
          split: true,
          valueDecimals: 0,
          valueSuffix: '°F',
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false,
            },
            cursor: 'pointer',
          },
        },
        // Data source: https://www.ncdc.noaa.gov
        data: {
          csv: null,
          firstRowAsNames: false,
          parsed: function(columns) {
            columns.splice(1, 2); // Remove the non-average columns
          },
        },
        series: [
          {
            name: 'San Diego',
            id: 'sd',
            color: '#f4b042',
          },
          {
            name: 'New York',
            id: 'ny',
            color: '#41aff4',
          },
        ],
      },
    };
  }
  componentDidMount() {
    let csvData = document.getElementById('csv_data').innerHTML;
    let newOptions = this.state.options;
    newOptions.data.csv = csvData;
    this.setState({
      options: newOptions,
    });
  }
  render() {
    return (
      <>
        <HighchartsReact highcharts={Highcharts} options={this.state.options} />
        <pre id="csv_data" style={{ display: 'none' }}>
          2018-01-07,61,9,61,15.85714286 2018-01-14,66,20,61,33.85714286
          2018-01-21,56,41,60,31.85714286 2018-01-28,61,46,58,39.28571429
          2018-02-04,63,35,65,32.14285714 2018-02-11,61,47,61,35.85714286
          2018-02-18,61,37,62,40.42857143 2018-02-25,55,44,54,45
          2018-03-04,57,41,56,43.42857143 2018-03-11,62,38,61,36.57142857
          2018-03-18,57,36,60,36.57142857 2018-03-25,59,40,61,38.14285714
          2018-04-01,60,48,60,43.28571429 2018-04-08,64,38,62,41.14285714
          2018-04-15,68,43,66,45.85714286 2018-04-22,64,51,61,46
          2018-04-29,62,54,62,53.28571429 2018-05-06,67,60,62,62.57142857
          2018-05-13,63,53,62,58.42857143 2018-05-20,62,67,63,60.14285714
          2018-05-27,63,65,63,67.71428571 2018-06-03,67,63,65,65.14285714
          2018-06-10,68,68,66,64 2018-06-17,65,74,67,68.57142857
          2018-06-24,65,69,66,71.42857143 2018-07-01,66,82,67,75.14285714
          2018-07-08,78,69,72,76.57142857 2018-07-15,74,75,74,75.14285714
          2018-07-22,76,73,73,74.85714286 2018-07-29,76,77,75,76.57142857
          2018-08-05,76,81,77,77.42857143 2018-08-12,80,76,81,79
          2018-08-19,76,71,76,77 2018-08-26,74,73,75,73
          2018-09-02,71,72,74,78.28571429 2018-09-09,70,61,72,75
          2018-09-16,74,72,72,69.71428571 2018-09-23,71,63,71,70.42857143
          2018-09-30,71,63,69,65.71428571 2018-10-07,68,71,71,68.14285714
          2018-10-14,68,53,68,64
        </pre>
      </>
    );
  }
}
