import React, { Component } from 'react';
import { Flex, Box } from 'rebass';
import moment from 'moment';
import DatePicker from '../../../components/DatePicker';
import Dropdown from '../../../components/Select';
import Button from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import Table from '../../../components/Table';
import { fahrenheitToCelcius, createCSV } from '../../../helpers/functions';

const ForecastTableColumns = [
  {
    Header: 'Time',
    id: 'time',
    accessor: 'time',
    Cell: ({ original: { observation_time } }) => (
      <span>{moment(observation_time).format('DD/MM/YY - hh:mm')}</span>
    ),
    style: {
      color: '#8c8c8c',
    },
  },
  {
    Header: 'Barometer',
    id: 'barometer',
    Cell: ({ original: { barometer } }) => (
      <span>{parseFloat(barometer).toFixed(1)} hPa</span>
    ),
  },
  {
    Header: 'Temperature',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { temperature } }) => <span>{temperature}&deg;C</span>,
  },
  {
    Header: 'High Temp.',
    id: 'High Temperature',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { low_temperature } }) => (
      <span>{low_temperature}&deg;C</span>
    ),
  },
  {
    Header: 'Low Temp.',
    id: 'Low Temp',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { high_temperature } }) => (
      <span>{high_temperature}&deg;C</span>
    ),
  },
  {
    Header: 'Humidity',
    id: 'Humidity',
    Cell: ({ original: { humidity } }) => <span>{humidity}%</span>,
  },
  {
    Header: 'Wind Speed',
    id: 'Wind Speed',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { wind_speed } }) => <span>{wind_speed} m/s</span>,
  },
  {
    Header: 'Wind Direction',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { wind_direction } }) => <span>{wind_direction}</span>,
  },
  {
    Header: 'Wind Chill',
    id: 'windchill',
    accessor: 'windchill',
    style: {
      backgroundColor: '#f4f4f4',
    },
  },
  {
    Header: 'Rain Rate',
    id: 'Rain Rate',
    Cell: ({ original: { rain_rate } }) => (
      <span>{parseFloat(rain_rate).toFixed(1)}</span>
    ),
  },
];

export default class ForecastTable extends Component {
  state = {
    loading: false,
  };
  componentDidMount() {
    const { weatherStation, history } = this.props;
    if (Object.values(weatherStation).length === 0) {
      history.push('/dashboard/weather-data/map');
    }
  }
  getTableData = () => {
    const { weatherStation, weatherStationLogs } = this.props;
    const {
      windchill,
      rain_rate,
      current_humidity,
      wind_speed,
      pressure_in,
      observation_time,
      temp_f,
      wind_direction,
      davis_current_observation: { temp_day_low_f, temp_day_high_f } = {},
    } = weatherStation;
    return [
      {
        windchill,
        wind_speed,
        rain_rate,
        wind_direction,
        barometer: pressure_in,
        time: observation_time,
        humidity: current_humidity,
        temperature: fahrenheitToCelcius(temp_f),
        low_temperature: fahrenheitToCelcius(temp_day_low_f),
        high_temperature: fahrenheitToCelcius(temp_day_high_f),
      },
    ];
  };
  exportWeatherData = () => {
    const { dispatch, actions } = this.props;
    this.setState({ loading: true });
    dispatch({ type: actions.EXPORT_WEATHER_DATA }).then(data => {
      this.setState({ loading: false });
      createCSV(data);
    });
  };
  render() {
    let data = this.getTableData();
    return (
      <Box mt="32px">
        <Flex flexWrap="wrap">
          <Box width="350px" mr="20px">
            <DatePicker enableOutsideDays />
          </Box>
          <Box width="250px" mr="20px">
            <Dropdown
              options={[{ label: '1 day', value: '1 day' }]}
              label="Span"
              value="1 day"
            />
          </Box>
          <Box width="200px">
            <Button
              kind="green"
              size="large"
              width="100%"
              css={`
                display: flex;
                align-items: center;
              `}
              isLoading={this.state.loading}
              onClick={this.exportWeatherData}
            >
              <Icon name="asset" color="#fff" size={24} />
              Export CSV
            </Button>
          </Box>
        </Flex>
        <Box mt="40px">
          <Table
            data={data}
            showPagination={false}
            noDataText="No Weather Data"
            columns={ForecastTableColumns}
          />
        </Box>
      </Box>
    );
  }
}
