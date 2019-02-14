import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardLayout from '.';

const DashboardRoutes = props => {
  return (
    <DashboardLayout NavLink={true}>
      <Switch>
        <Route
          path={`/dashboard/weather-forecast"`}
          exact
          component={<div />}
        />
        <Route path="/dashboard/contacts" render={() => <div />} />
        <Route path="/dashboard/alert" render={() => <div />} />
        <Route path="/dashboard/team" render={() => <div />} />
      </Switch>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
