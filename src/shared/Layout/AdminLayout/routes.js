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

const DashboardRoutes = ({token, ...rest}) => {
  return (
    <DataProvider token={token}>
      <DataContext.Consumer>
        {({ state, dispatch, actions }) => (
          <DashboardLayout NavLink={true} {...rest}>
            <Switch>
              <Route
                path="/admin/dashboard/weather-data"
                render={() => (
                  <Forecast {...rest} {...{ ...state, dispatch, actions }} />
                )}
              />
              <Route
                path="/admin/dashboard/contacts"
                render={() => (
                  <Contacts {...rest} {...{ ...state, dispatch, actions }} />
                )}
              />
              <Route
                path="/admin/dashboard/alerts"
                render={() => <Alerts {...rest} {...{ ...state, dispatch, actions }} />}
              />
              <Route
                path="/admin/dashboard/team"
                render={() => <Teams {...rest} {...{ ...state, dispatch, actions }} />}
              />
              <Route
                path="/admin/dashboard/profile/"
                render={() => (
                  <Account {...rest} {...{ ...state, dispatch, actions }} />
                )}
              />
             
            </Switch>
          </DashboardLayout>
        )}
      </DataContext.Consumer>
    </DataProvider>
  );
};

export default DashboardRoutes;
