import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Box } from 'rebass';
import CustomerDetails from './CustomerDetails';
import CustomerOrganisation from './CustomerOrganisation';
import CustomerBilling from './CustomerBilling';
import Breadcrumbs, { BreadcrumbItem } from '../../../../../components/Breadcrumb'
import TabNav from '../../../../../components/TabNav';
import CustomerForecastMap from './CustomerWeatherForcast';
import CustomerAdvisoryModules from './CustomerAdvisory'
export default class thisCustomer extends Component {
  render() {
    const { profile, clearAllState, history } = this.props;
    return (
      <Box py="40px" px="40px">
        <Box mb="40px">
          <Breadcrumbs>
            <BreadcrumbItem url="/dashboard/customer" useNavlink>
              Customer
            </BreadcrumbItem>
            <BreadcrumbItem isActive>
              {profile.first_name}
            </BreadcrumbItem>
          </Breadcrumbs>
        </Box>
        <Box>
          <TabNav
            links={[
              {
                url: '/dashboard/customer/bulletin',
                label: 'Profile',
                icon: 'user',
              },
              {
                url: '/dashboard/customer/bulletin/organisation',
                label: 'Organisation Information',
                icon: 'combine--box',
                flex: '0 0 239px',
                max: '239px',
              },
              {
                url: '/dashboard/customer/bulletin/billing',
                label: 'Billing Information',
                icon: 'shapes-doc',
                flex: '0 0 204px',
                max: '204px',
              },
              {
                url: '/dashboard/customer/bulletin/weather-forcast',
                label: 'Weather Stations',
                icon: 'weather',
                flex: '0 0 204px',
                max: '204px',
              },
              {
                url: '/dashboard/customer/bulletin/advisory-modules',
                label: 'Advisory Modules',
                icon: 'weather',
                flex: '0 0 204px',
                max: '204px',
              },
            ]}
            useNavLink
          >
            <>
              <Route
                exact
                path="/dashboard/customer/bulletin"
                render={props => (
                  <CustomerDetails
                    {...{ props }}
                    profile={profile}
                    clearAllState={() => clearAllState(history)}
                  />
                )}
              />
              <Route
                path="/dashboard/customer/bulletin/organisation"
                render={props => <CustomerOrganisation {...{ props }} />}
              />
              <Route
                path="/dashboard/customer/bulletin/billing"
                render={props => <CustomerBilling {...{ props }} />}
              />
              <Route
                path="/dashboard/customer/bulletin/weather-forcast"
                render={props => <CustomerForecastMap {...{ props }} />}
              />
               <Route
                path="/dashboard/customer/bulletin/advisory-modules"
                render={props => <CustomerAdvisoryModules {...{ props }} />}
              />
            </>
          </TabNav>
        </Box>
      </Box>
    );
  }
}
