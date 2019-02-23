import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardLayout from '.';
import Contacts from '../../../views/Dashboard/Contacts';
import Alerts from '../../../views/Dashboard/Alerts';
import Teams from '../../../views/Dashboard/Team';
import Account from '../../../views/Dashboard/Account';
import Forecast from '../../../views/Dashboard/Forecast';

const DashboardRoutes = props => {
  return (
    <DashboardLayout NavLink={true} {...props}>
      <Switch>
        <Route
          path="/admin/dashboard/weather-forecast"
          render={() => <Forecast {...props} />}
        />
        <Route
          path="/admin/dashboard/contacts"
          render={() => <Contacts {...props} />}
        />
        <Route path="/admin/dashboard/alerts" render={() => <Alerts {...props} />} /> 
        <Route path="/admin/dashboard/team" render={() => <Teams {...props} />} />
        <Route path="/admin/dashboard/profile/" render={() => <Account {...props} />} />
      </Switch>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
