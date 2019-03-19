import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardLayout from '.';
import Contacts from '../../../views/Dashboard/Contacts';
import Alerts from '../../../views/Dashboard/Alerts';
import Teams from '../../../views/Dashboard/Team';
import Account from '../../../views/Dashboard/Account';
import Forecast from '../../../views/Dashboard/Forecast';
import { DataProvider } from '../../../api/provider';
import { DataContext } from '../../../api/context';
import { FullScreenSpinner } from '../../../components/Spinner';
import Home from '../../../views/Dashboard/Home';

const DashboardRoutes = ({ token, opus1_token, ...rest }) => {
  return (
    <DataProvider token={token} opus1_token={opus1_token} history={rest.history}>
      <DataContext.Consumer>
        {({ state, dispatch, actions }) =>
          state.fetching ? (
            <FullScreenSpinner />
          ) : (
            <DashboardLayout
              NavLink={true}
              {...rest}
              {...{ ...state, dispatch }}
            >
              <Switch>
                <Route path="/dashboard/stats" render={() => (
                  <Home  {...rest} {...{ ...state, dispatch, actions }}/>
                )}/>
                <Route
                  path="/dashboard/weather-data"
                  render={() => (
                    <Forecast {...rest} {...{ ...state, dispatch, actions, }} />
                  )}
                />
                <Route
                  path="/dashboard/contacts"
                  render={() => (
                    <Contacts {...rest} {...{ ...state, dispatch, actions }} />
                  )}
                />
                <Route
                  path="/dashboard/alerts"
                  render={() => (
                    <Alerts {...rest} {...{ ...state, dispatch, actions }} />
                  )}
                />
                <Route
                  path="/dashboard/team"
                  render={() => <Teams {...rest} {...{ ...state, dispatch, actions }} />}
                />
                <Route
                  path="/dashboard/profile/"
                  render={() => (
                    <Account {...rest} {...{ ...state, dispatch, actions }} />
                  )}
                />
              </Switch>
            </DashboardLayout>
          )
        }
      </DataContext.Consumer>
    </DataProvider>
  );
};

export default DashboardRoutes;
