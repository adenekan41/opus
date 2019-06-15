import React from "react";
import { Switch, Route } from "react-router-dom";
import DashboardLayout from ".";
import Contacts from "../../../views/Dashboard/Contacts";
import Alerts from "../../../views/Dashboard/Alerts";
import Users from "../../../views/Dashboard/Team";
import Account from "../../../views/Dashboard/Account";
import Forecast from "../../../views/Dashboard/Forecast";
import { DataProvider } from "../../../api/provider";
import { DataContext } from "../../../api/context";
import { FullScreenSpinner } from "../../../components/Spinner";
import Home from "../../../views/Dashboard/Home";
import Compare from "../../../views/Dashboard/Compare";
import AssetManagement from "../../../views/Dashboard/Assets";
import Customer from '../../../views/Dashboard/Customer'

const DashboardRoutes = ({ token, clearAllState, ...rest }) => {
  return (
    <DataProvider token={token} history={rest.history}>
      <DataContext.Consumer>
        {({ state, dispatch, actions, clearAllState: clearProviderState }) =>
          state.fetching ? (
            <FullScreenSpinner />
          ) : (
            <DashboardLayout
              NavLink={true}
              {...rest}
              {...{ ...state, dispatch }}
            >
              <Switch>
                <Route
                  path="/dashboard/stats"
                  render={() => (
                    <Home {...rest} {...{ ...state, dispatch, actions }} />
                  )}
                />
                <Route
                  path="/dashboard/weather-data"
                  render={() => (
                    <Forecast {...rest} {...{ ...state, dispatch, actions }} />
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
                  path="/dashboard/users"
                  render={() => (
                    <Users {...rest} {...{ ...state, dispatch, actions }} />
                  )}
                />
                <Route
                  path="/dashboard/profile/"
                  render={() => (
                    <Account
                      {...rest}
                      {...{ ...state, dispatch, actions }}
                      clearAllState={history => {
                        clearProviderState();
                        clearAllState(history);
                      }}
                    />
                  )}
                />
                <Route
                  path="/dashboard/compare/"
                  render={() => (
                    <Compare {...rest} {...{ ...state, dispatch, actions }} />
                  )}
                />
                <Route
                  path="/dashboard/assets/"
                  render={() => (
                    <AssetManagement
                      {...rest}
                      {...{ ...state, dispatch, actions }}
                    />
                  )}
                />
                <Route
                  path="/dashboard/customer/"
                  render={() => (
                    <Customer {...rest} {...{ ...state, dispatch, actions }} />
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
