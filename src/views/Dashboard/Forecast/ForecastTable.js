import React, { Component } from 'react';
import { Flex, Box, Heading } from 'rebass';
import moment from 'moment';
import DatePicker from '../../../components/DatePicker';
import Button from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import Table from '../../../components/Table';
import {
  fahrenheitToCelcius,
  createCSV,
  getValue,
  valueInDecimal,
} from '../../../helpers/functions';

const ForecastTableColumns = [
  {
    Header: 'Time',
    id: 'time',
    accessor: 'time',
    Cell: ({ original: { time } }) => (
      <span>{moment(time).format('DD/MM/YY - hh:mm')}</span>
    ),
    fixed: 'left',
    style: {
      color: '#ffffff',
      backgroundColor: '#3c464c',
    },
    width: 120,
  },
  {
    Header: 'Barometer',
    id: 'barometer',
    Cell: ({ original: { barometer } }) => {
      return <span>{getValue(valueInDecimal(barometer), 'hPa')}</span>;
    },
    width: 120,
  },
  {
    Header: 'Temperature',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { temperature } }) => (
      <span>{getValue(temperature, '°C')}</span>
    ),
    width: 120,
  },
  {
    Header: 'High Temp.',
    id: 'High Temperature',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { low_temperature } }) => (
      <span>{getValue(low_temperature, `°C`)}</span>
    ),
    width: 120,
  },
  {
    Header: 'Low Temp.',
    id: 'Low Temp',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { high_temperature } }) => (
      <span>{getValue(high_temperature, '°C')}</span>
    ),
    width: 120,
  },
  {
    Header: 'Humidity',
    id: 'Humidity',
    Cell: ({ original: { humidity } }) => (
      <span>{getValue(humidity, '%')}</span>
    ),
    width: 120,
  },
  {
    Header: 'Dew Point',
    id: 'Dew Point',
    Cell: ({ original: { dewpoint } }) => (
      <span>{getValue(dewpoint, '°C')}</span>
    ),
    width: 120,
  },
  {
    Header: 'Wind Speed',
    id: 'Wind Speed',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { wind_speed } }) => (
      <span>{getValue(wind_speed, 'm/s')}</span>
    ),
    width: 120,
  },
  {
    Header: 'Wind Direction',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { wind_direction } }) => (
      <span>{getValue(wind_direction)}</span>
    ),
    width: 140,
  },
  {
    Header: 'Wind Run',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { wind_kt } }) => <span>{getValue(wind_kt, 'm')}</span>,
    width: 120,
  },
  {
    Header: 'High Wind Speed',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { wind_day_high_mph } }) => (
      <span>{getValue(wind_day_high_mph, 'm/s')}</span>
    ),
    width: 180,
  },
  {
    Header: 'High Wind Direction',
    style: {
      backgroundColor: '#f4f4f4',
    },
    Cell: ({ original: { wind_kt } }) => <span>{getValue(wind_kt, 'm')}</span>,
    width: 180,
  },
  {
    Header: 'Wind Chill',
    id: 'windchill',
    Cell: ({ original: { windchill } }) => (
      <span>{getValue(windchill, '°C')}</span>
    ),
    style: {
      backgroundColor: '#f4f4f4',
    },
    width: 120,
  },
  {
    Header: 'Heat Index',
    id: 'heat_index',
    Cell: ({ original: { heat_index } }) => (
      <span>{getValue(heat_index, '°C')}</span>
    ),
    style: {
      backgroundColor: '#f4f4f4',
    },
    width: 120,
  },
  {
    Header: 'THW Index',
    id: 'thw_index',
    Cell: ({ original: { heat_index } }) => (
      <span>{getValue(heat_index, '°C')}</span>
    ),
    style: {
      backgroundColor: '#f4f4f4',
    },
    width: 120,
  },
  {
    Header: 'Rain',
    id: 'Rain',
    Cell: ({ original: { rain_day_in } }) => (
      <span>{getValue(valueInDecimal(rain_day_in))}</span>
    ),
    width: 120,
  },
  {
    Header: 'Rain Rate',
    id: 'Rain Rate',
    Cell: ({ original: { rain_rate } }) => (
      <span>{getValue(valueInDecimal(rain_rate))}</span>
    ),
    width: 120,
  },
  {
    Header: 'ET',
    id: 'ET',
    Cell: ({ original: { et_day } }) => (
      <span>{getValue(et_day)}</span>
    ),
    width: 120,
  },
];

export default class ForecastTable extends Component {
  state = {
    loading: false,
    endDate: moment(new Date()),
    startDate: moment(new Date()),
    weatherStationLogs: this.props.weatherStationLogs || [],
  };

  componentDidMount() {
    const { weatherStation, history } = this.props;
    if (Object.values(weatherStation).length === 0) {
      history.push('/dashboard/weather-data/map');
    }
  }

  getSingleDataPoint = weatherStation => {
    const {
      windchill,
      rain_rate,
      current_humidity,
      wind_speed,
      pressure_in,
      observation_time,
      temp_f,
      dewpoint,
      heat_index,
      rain_day_in,
      wind_kt,
      wind_direction,
      et_day,
      davis_current_observation: {
        temp_day_low_f,
        temp_day_high_f,
        wind_day_high_mph,
      } = {},
    } = weatherStation;

    return {
      windchill,
      wind_speed,
      rain_rate,
      wind_direction,
      dewpoint,
      heat_index,
      rain_day_in,
      wind_kt,
      et_day,
      wind_day_high_mph,
      barometer: pressure_in,
      time: observation_time,
      humidity: current_humidity,
      temperature: fahrenheitToCelcius(temp_f),
      low_temperature: fahrenheitToCelcius(temp_day_low_f),
      high_temperature: fahrenheitToCelcius(temp_day_high_f),
    };
  };

  getTableData = () => {
    const { weatherStationLogs } = this.state;
    return weatherStationLogs.map(this.getSingleDataPoint);
  };

  exportWeatherData = () => {
    const { dispatch, actions, weatherStation } = this.props;
    const { startDate, endDate } = this.state;

    this.setState({ loading: true });

    dispatch({
      type: actions.EXPORT_WEATHER_DATA,
      value: {
        station_name: weatherStation.station_name,
        start_date: startDate,
        end_date: endDate,
      },
    })
      .then(data => {
        this.setState({ loading: false });
        createCSV(data);
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  filterDataByDate = dates => {
    const { dispatch, actions } = this.props;
    let data = dispatch({
      type: actions.FILTER_WEATHER_DATA_BY_DATE,
      value: dates,
    });
    this.setState({
      weatherStationLogs: data,
    });
  };

  render() {
    let data = this.getTableData();
    return (
      <Box mt="32px">
        <Flex flexWrap="wrap">
          <Box width="350px" mr="20px">
            <DatePicker
              isOutsideRange={() => false}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={({ startDate, endDate }) => {
                this.setState(
                  {
                    startDate,
                    endDate,
                  },
                  () => this.filterDataByDate({ startDate, endDate })
                );
              }}
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
          {data.length > 0 ? (
            <Table
              data={data}
              showPagination={data.length > 20}
              noDataText="No Weather Data"
              columns={ForecastTableColumns}
              style={{ height: 500 }}
            />
          ) : (
            <Flex alignItems="center" justifyContent="center" py="30vh">
              <Heading>No Weather Data</Heading>
            </Flex>
          )}
        </Box>
      </Box>
    );
  }
}
