import React, { Component } from 'react';
import { Box } from 'rebass';
import Breadcrumbs, { BreadcrumbItem } from '../../../components/Breadcrumb';

export default class ForecastReport extends Component {
  render() {
    return (
      <Box py="40px" px="40px">
        <Box mb="40px">
          <Breadcrumbs>
            <BreadcrumbItem url="/dashboard/weather-forecast/map" useNavlink>
              Map
            </BreadcrumbItem>
            <BreadcrumbItem
              url="/dashboard/weather-forecast/bulletin/charts"
              useNavlink
            >
              LCM Apapa
            </BreadcrumbItem>
            <BreadcrumbItem isActive>Report</BreadcrumbItem>
          </Breadcrumbs>
        </Box>
      </Box>
    );
  }
}
