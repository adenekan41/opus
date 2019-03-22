import React, { Component } from 'react';
import { Box, Flex, Text } from 'rebass';
import { Line } from 'react-chartjs-2';
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
  };
  componentDidMount() {
    const { weatherStation, history } = this.props;
    if (Object.values(weatherStation).length === 0) {
      history.push('/dashboard/weather-data/map');
    }
  }
  exportWeatherData = () => {
    const { dispatch, actions } = this.props;
    this.setState({ loading: true });
    dispatch({ type: actions.EXPORT_WEATHER_DATA }).then(data => {
      this.setState({ loading: false });
      createCSV(data);
    });
  };
  render() {
    const { weatherStation } = this.props;
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
                { value: 'temperature', label: 'Temperature' },
                { value: 'current rain', label: 'Current rain' },
                { value: 'total rain', label: 'Total rain' },
                { value: 'humidity', label: 'Humidity' },
                { value: 'wind speed', label: 'Wind speed' },
                { value: 'wind direction', label: 'Wind direction' },
                { value: 'wind rose', label: 'Wind rose' },
                { value: 'barometer', label: 'Barometer' },
              ]}
              label="Select graph"
              value="temperature"
            />
          </Box>
          <Box className="col-md-4">
            <DatePicker />
          </Box>
          <Box className="col-md-3">
            <Dropdown
              options={[
                { value: '1', label: '1 day' },
              ]}
              label="Span"
              value="1"
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
                <span style={{ fontWeight: 'bold' }}>{weatherStation.station_name} - </span>
                <span style={{ fontStyle: 'italic' }}>
                  28 Feb, 2019 00:00 to 28 Feb, 2019 00:00
                </span>
              </Text>
            </Flex>
            <ReportChart />
          </Card>
        </Box>
      </Box>
    );
  }
}
