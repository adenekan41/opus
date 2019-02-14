import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardLayout from '.';

const DashboardRoutes = props => ({
  render() {
    return (
      <DashboardLayout>
        <Switch>
          <Route path="/weather-forecast" exact component={<div />} />
          <Route path="/contacts" component={<div/>} />
          <Route path="/alert" component={<div/>} />
          <Route path="/team" component={<div/>} />
        </Switch>
      </DashboardLayout>
    );
  },
});

export default DashboardRoutes;
