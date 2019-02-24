import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Footer from './Footer';
import Login from '../../views/Auth/Login/login';
import Recover from '../../views/Auth/Recover/Recover';
import DashboardRoutes from '../../shared/Layout/DashboardLayout/routes';
import AdminDashboardRoutes from '../../shared/Layout/AdminLayout/routes';
import { ProtectedRoute } from '../../components/Route';
const PrimaryLayout = ({ isLoggedIn, token, onLogin, clearAllState }) => (
  <React.Fragment>
    <Switch>
      <Route
        path="/"
        exact
        render={props => <Login {...props} onLogin={onLogin} />}
      />
      <Route path="/recover" component={Recover} />
      <ProtectedRoute
        path="/dashboard"
        isLoggedIn={isLoggedIn}
        render={props => (
          <DashboardRoutes
            {...props}
            token={token}
            clearAllState={clearAllState}
          />
        )}
      />
      <ProtectedRoute
        path="/admin/dashboard"
        isLoggedIn={isLoggedIn}
        render={props => <AdminDashboardRoutes {...props} token={token} />}
      />
    </Switch>
  </React.Fragment>
);

export default PrimaryLayout;
