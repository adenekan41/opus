import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Box } from 'rebass';
import Breadcrumbs, { BreadcrumbItem } from '../../../components/Breadcrumb';
import TabNav from '../../../components/TabNav';
import ForecastCharts from './ForecastChart';
import ForecastTable from './ForecastTable';
import ForecastReport from './ForecastReport';

export default class ForecastBulletin extends Component {
  render() {
    const { weatherStation, weatherStationLogs, ...rest } = this.props;
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
                flex: '0 0 180px',
                max: '180px',
              },
              {
                url: '/dashboard/weather-data/bulletin/weather-data',
                label: 'Weather data',
                icon: 'chart',
                flex: '0 0 180px',
                max: '180px',
              },
              {
                url: `/dashboard/weather-data/${
                  weatherStation.station_name
                }/report`,
                label: 'Weather report',
                icon: 'doc',
                flex: '0 0 180px',
                max: '180px',
              },
            ]}
            useNavLink
          >
            <>
              <Route
                path="/dashboard/weather-data/bulletin/:id/charts"
                render={props => (
                  <ForecastCharts
                    {...props}
                    {...rest}
                    weatherStation={weatherStation}
                    weatherStationLogs={weatherStationLogs}
                  />
                )}
              />
              <Route
                path="/dashboard/weather-data/bulletin/weather-data"
                render={props => (
                  <ForecastTable
                    {...rest}
                    {...props}
                    weatherStation={weatherStation}
                    weatherStationLogs={weatherStationLogs}
                  />
                )}
              />
              <Route
                path="/dashboard/weather-data/:id/report"
                render={props => (
                  <ForecastReport
                    {...rest}
                    {...props}
                    weatherStation={weatherStation}
                  />
                )}
              />
            </>
          </TabNav>
        </Box>
      </Box>
    );
  }
}
