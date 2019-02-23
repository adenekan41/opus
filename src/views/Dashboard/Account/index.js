import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Box } from 'rebass';
import Profile from './components/profile'
import Organisation from './components/organisation'
import Billing from './components/billing'
import TabNav from '../../../components/TabNav';


export default class ForecastBulletin extends Component {
  render() {
    return (
      <Box py="40px" px="40px">
       
        <Box>
          <TabNav
            links={[
              {
                url: '/dashboard/profile/',
                label: 'Profile',
                icon: 'avatar',
              },
              {
                url: '/dashboard/profile/organisation',
                label: 'Organisation Information',
                icon: 'combine--box',
                flex:'0 0 239px',
                max:"239px",
              },
               {
                url: '/dashboard/profile/billing',
                label: 'Billing Information',
                icon: 'shapes-doc',
                flex:'0 0 204px',
                max:"204px",
              },
            ]}
            useNavLink
          >
            <>
              <Route
                exact
                path="/dashboard/profile/"
                render={props => <Profile {...{props}} />}
              />
              <Route
                path="/dashboard/profile/organisation"
                render={props => <Organisation {...{props}} />}
              />
              <Route
                path="/dashboard/profile/billing"
                render={props => <Billing {...{props}}/>}
              />
            </>
          </TabNav>
        </Box>
      </Box>
    );
  }
}
