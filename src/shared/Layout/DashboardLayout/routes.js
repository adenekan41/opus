import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardLayout from '.';
import Contacts from '../../../views/Dashboard/Contacts';
import Alerts from '../../../views/Dashboard/Alerts';
import Forecast from '../../../views/Dashboard/Forecast';

const DashboardRoutes = props => {
  return (
    <DashboardLayout NavLink={true} {...props}>
      <Switch>
        <Route
          path="/dashboard/weather-forecast"
          render={() => <Forecast {...props} />}
        />
        <Route
          path="/dashboard/contacts"
          render={() => <Contacts {...props} />}
        />
        <Route path="/dashboard/alert" render={() => <Alerts {...props} />} /> 
        <Route path="/dashboard/team" render={() => <div />} />
      </Switch>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
