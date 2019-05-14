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
import { WEATHER_OPTIONS } from '../../../helpers/constants';

export default class ForecastReport extends Component {
  state = {
    data: [],
    loading: false,
    observationTimes: [],
    startDate: moment(new Date()),
    endDate: moment(new Date()),
  };

  componentDidMount() {
    const { weatherStation, history, type } = this.props;
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
    let { result, observationTimes } = data;
    this.setState({
      data: result,
      observationTimes,
    });
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

  render() {
    const { weatherStation, type } = this.props;
    let { data, startDate, endDate, observationTimes } = this.state;
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
              options={WEATHER_OPTIONS}
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
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={({ startDate, endDate }) => {
                this.setState(
                  {
                    startDate,
                    endDate,
                  },
                  () => this.getWeatherTypeData(type, { startDate, endDate })
                );
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
            <ReportChart
              {...{
                type,
                data,
                observationTimes,
              }}
            />
          </Card>
        </Box>
      </Box>
    );
  }
}
