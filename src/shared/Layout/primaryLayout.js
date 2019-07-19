import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../../views/Auth/Login/login';
import Recover from '../../views/Auth/Recover/Recover';
import DashboardRoutes from '../../shared/Layout/DashboardLayout/routes';
import { ProtectedRoute, AuthRoute } from '../../components/Route';
const PrimaryLayout = ({
  token,
  onLogin,
  isLoggedIn,
  opus1_token,
  clearAllState,
  onResetPassword,
}) => (
  <React.Fragment>
    <Switch>
      <AuthRoute
        exact
        path="/"
        isLoggedIn={isLoggedIn}
        render={props => <Login {...props} onLogin={onLogin} />}
      />
      <Route
        path="/new-password"
        render={props => (
          <Recover {...props} onResetPassword={onResetPassword} />
        )}
      />
      <ProtectedRoute
        path="/dashboard"
        isLoggedIn={isLoggedIn}
        render={props => (
          <DashboardRoutes
            {...props}
            token={token}
            opus1_token={opus1_token}
            clearAllState={clearAllState}
          />
        )}
      />
    </Switch>
  </React.Fragment>
);

export default PrimaryLayout;
