import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Box } from 'rebass';
import Breadcrumbs, { BreadcrumbItem } from '../../../components/Breadcrumb';
import TabNav from '../../../components/TabNav';
import ForecastCharts from './ForecastChart';
import ForecastTable from './ForecastTable';

export default class ForecastBulletin extends Component {
  render() {
    return (
      <Box py="40px" px="40px">
        <Box mb="40px">
          <Breadcrumbs>
            <BreadcrumbItem url="/dashboard/weather-forecast/map" useNavlink>
              Map
            </BreadcrumbItem>
            <BreadcrumbItem isActive>LCM Apapa</BreadcrumbItem>
          </Breadcrumbs>
        </Box>
        <Box>
          <TabNav
            links={[
              {
                url: '/dashboard/weather-forecast/bulletin/charts',
                label: 'Opus snapshots',
                icon: 'boxes',
                flex: '0 0 170px',
                max: '170px',
              },
              {
                url: '/dashboard/weather-forecast/bulletin/weather-data',
                label: 'Weather data',
                icon: 'chart',
              },
            ]}
            useNavLink
          >
            <>
              <Route
                path="/dashboard/weather-forecast/bulletin/charts"
                render={props => <ForecastCharts {...props} />}
              />
              <Route
                path="/dashboard/weather-forecast/bulletin/weather-data"
                render={props => <ForecastTable {...props} />}
              />
            </>
          </TabNav>
        </Box>
      </Box>
    );
  }
}
