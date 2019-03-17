import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ForecastMap from './ForecastMap';
import ForecastBulletin from './ForecastBulletin';
import ForecastReport from './ForecastReport';

export default class Forecast extends Component {
  render() {
    return (
      <>
        <Route
          exact
          path="/dashboard/weather-forecast/map"
          render={props => <ForecastMap {...props} {...this.props}/>}
        />
        <Route
          path="/dashboard/weather-forecast/bulletin"
          render={props => <ForecastBulletin {...props} {...this.props} />}
        />
        <Route
          path="/dashboard/weather-forecast/report"
          render={props => <ForecastReport {...props} {...this.props} />}
        />
      </>
    );
  }
}
