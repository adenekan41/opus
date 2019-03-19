import React, { Component } from 'react';
import { Box, Flex, Text } from 'rebass';
import Breadcrumbs, { BreadcrumbItem } from '../../../components/Breadcrumb';
import DatePicker from '../../../components/DatePicker';
import Dropdown from '../../../components/Select';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import { Icon } from '../../../components/Icon';
import ReportChart from './charts/ReportChart';

export default class ForecastReport extends Component {
  render() {
    return (
      <Box py="40px" px="40px">
        <Box mb="40px">
          <Breadcrumbs>
            <BreadcrumbItem url="/dashboard/weather-data/map" useNavlink>
              Map
            </BreadcrumbItem>
            <BreadcrumbItem
              url="/dashboard/weather-data/bulletin/charts"
              useNavlink
            >
              LCM Apapa
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
            />
          </Box>
          <Box className="col-md-4">
            <DatePicker />
          </Box>
          <Box className="col-md-3">
            <Dropdown
              options={[
                { value: '1', label: '1 day' },
                { value: '10', label: '10 days' },
              ]}
              label="Span"
            />
          </Box>
          <Box className="col-md-2">
            <Button block size="large" kind="green">
              <Icon name="sheet" color="#ffffff" />{' '}
              <span style={{ paddingLeft: '8px' }}>Export CSV</span>
            </Button>
          </Box>
        </Box>
        <Box mt="30px">
          <Card padding="16px">
            <Flex alignItems="center" justifyContent="space-between" mb="16px">
              <Text fontSize="12px">
                <span style={{ fontWeight: 'bold' }}>LCM Apapa - </span>
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
