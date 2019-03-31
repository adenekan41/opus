import React, { Component } from 'react';
import moment from 'moment';
import { Box, Flex, Text } from 'rebass';
import Breadcrumbs, { BreadcrumbItem } from '../../../components/Breadcrumb';
import DatePicker from '../../../components/DatePicker';
import Dropdown from '../../../components/Select';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import { Icon } from '../../../components/Icon';
import ReportChart from './charts/ReportChart';
import { createCSV } from '../../../helpers/functions';

export default class ForecastReport extends Component {
  state = {
    loading: false,
    data: [],
    startDate: new Date(),
    endDate: new Date(),
  };

  componentDidMount() {
    const { weatherStation, history, type } = this.props;
    if (Boolean(type) === false) {
      history.push('/dashboard/weather-data/map');
    }
    if (Object.values(weatherStation).length === 0) {
      history.push('/dashboard/weather-data/map');
    }
    this.getWeatherTypeData(type, {
      startDate: new Date(),
      endDate: new Date(),
    });
  }

  getWeatherTypeData = (type, dates) => {
    const { dispatch, actions } = this.props;
    let data = dispatch({
      type: actions.FILTER_WEATHER_DATA_BY_TYPE,
      value: { type, dates },
    });
    this.setState({
      data,
    });
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
    const { weatherStation, type } = this.props;
    let { data, startDate, endDate } = this.state;
    return (
      <Box py="40px" px="40px">
        <Box mb="40px">
          <Breadcrumbs>
            <BreadcrumbItem url="/dashboard/weather-data/map" useNavlink>
              Map
            </BreadcrumbItem>
            <BreadcrumbItem
              url={`/dashboard/weather-data/bulletin/${
                weatherStation.station_name
              }/charts`}
              useNavlink
            >
              {weatherStation.station_name}
            </BreadcrumbItem>
            <BreadcrumbItem isActive>Report</BreadcrumbItem>
          </Breadcrumbs>
        </Box>
        <Box className="row">
          <Box className="col-md-3">
            <Dropdown
              options={[
                { value: 'Temperature', label: 'Temperature' },
                { value: 'Current rain', label: 'Current rain' },
                { value: 'Total rain', label: 'Total rain' },
                { value: 'Humidity', label: 'Humidity' },
                { value: 'Wind speed', label: 'Wind speed' },
                { value: 'Wind direction', label: 'Wind direction' },
                { value: 'Barometer', label: 'Barometer' },
              ]}
              onChange={weatherType =>
                this.getWeatherTypeData(weatherType.value, {
                  startDate: new Date(),
                  endDate: new Date(),
                })
              }
              label="Select graph"
              value={type}
            />
          </Box>
          <Box className="col-md-4">
            <DatePicker
              isOutsideRange={() => false}
              onChange={({ startDate, endDate }) => {
                this.setState({
                  startDate,
                  endDate,
                });
                this.getWeatherTypeData(type, { startDate, endDate });
              }}
            />
          </Box>
          <Box className="col-md-2">
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
        </Box>
        <Box mt="30px">
          <Card padding="16px">
            <Flex alignItems="center" justifyContent="space-between" mb="16px">
              <Text fontSize="12px">
                <span style={{ fontWeight: 'bold' }}>
                  {weatherStation.station_name} -{' '}
                </span>
                <span style={{ fontStyle: 'italic' }}>
                  {moment(startDate).format('DD MMM, YYYY hh:mm')} to{' '}
                  {moment(endDate).format('DD MMM, YYYY hh:mm')}
                </span>
              </Text>
            </Flex>
            <ReportChart {...{ type, data }} />
          </Card>
        </Box>
      </Box>
    );
  }
}
