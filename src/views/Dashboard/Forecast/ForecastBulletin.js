import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Box } from 'rebass';
import Breadcrumbs, { BreadcrumbItem } from '../../../components/Breadcrumb';
import TabNav from '../../../components/TabNav';
import ForecastCharts from './ForecastChart';
import ForecastTable from './ForecastTable';

export default class ForecastBulletin extends Component {
  render() {
    const { weatherStation, ...rest } = this.props;
    return (
      <Box py="40px" px="40px">
        <Box mb="40px">
          <Breadcrumbs>
            <BreadcrumbItem url="/dashboard/weather-data/map" useNavlink>
              Map
            </BreadcrumbItem>
            <BreadcrumbItem isActive>
              {weatherStation.station_name}
            </BreadcrumbItem>
          </Breadcrumbs>
        </Box>
        <Box>
          <TabNav
            links={[
              {
                url: `/dashboard/weather-data/bulletin/${
                  weatherStation.station_name
                }/charts`,
                label: 'Opus snapshots',
                icon: 'boxes',
                flex: '0 0 170px',
                max: '170px',
              },
              {
                url: '/dashboard/weather-data/bulletin/weather-data',
                label: 'Weather data',
                icon: 'chart',
              },
            ]}
            useNavLink
          >
            <>
              <Route
                path="/dashboard/weather-data/bulletin/:id/charts"
                render={props => (
                  <ForecastCharts {...props} weatherStation={weatherStation} />
                )}
              />
              <Route
                path="/dashboard/weather-data/bulletin/weather-data"
                render={props => (
                  <ForecastTable {...props} {...rest} weatherStation={weatherStation} />
                )}
              />
            </>
          </TabNav>
        </Box>
      </Box>
    );
  }
}
