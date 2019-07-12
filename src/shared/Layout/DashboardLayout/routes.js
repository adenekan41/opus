import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import DashboardLayout from ".";
import { DataProvider } from "../../../api/provider";
import { DataContext } from "../../../api/context";
import { FullScreenSpinner } from "../../../components/Spinner";

const Home = lazy(() => import('../../../views/Dashboard/Home'))
const Compare = lazy(() => import('../../../views/Dashboard/Compare'))
const AssetManagement = lazy(() => import('../../../views/Dashboard/Assets'))
const Customer = lazy(() => import('../../../views/Dashboard/Customer'))
const Forecast = lazy(() => import('../../../views/Dashboard/Forecast'))
const Account = lazy(() => import('../../../views/Dashboard/Account'))
const Users = lazy(() => import('../../../views/Dashboard/Team'))
const Alerts = lazy(() => import('../../../views/Dashboard/Alerts'))
const Contacts = lazy(() => import('../../../views/Dashboard/Contacts'))

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
              <Suspense fallback={<div>Loading...</div>}>
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
                      <Forecast
                        {...rest}
                        {...{ ...state, dispatch, actions }}
                      />
                    )}
                  />
                  <Route
                    path="/dashboard/contacts"
                    render={() => (
                      <Contacts
                        {...rest}
                        {...{ ...state, dispatch, actions }}
                      />
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
                    path="/dashboard/customers/"
                    render={() => (
                      <Customer
                        {...rest}
                        {...{ ...state, dispatch, actions }}
                      />
                    )}
                  />
                </Switch>
              </Suspense>
            </DashboardLayout>
          )
        }
      </DataContext.Consumer>
    </DataProvider>
  );
};

export default DashboardRoutes;
