import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Footer from './Footer';
import Login from '../../views/Auth/Login/login';
import Recover from '../../views/Auth/Recover/Recover';
import DashboardRoutes from '../../shared/Layout/DashboardLayout/routes';
const PrimaryLayout = props => ({
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/recover" component={Recover} />
          <Route path="/dashboard" component={DashboardRoutes} />
        </Switch>
      </React.Fragment>
    );
  },
});

export default PrimaryLayout;