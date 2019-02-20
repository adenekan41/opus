import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ForecastMap from './ForecastMap';
import ForecastBulletin from './ForecastBulletin';


export default class Forecast extends Component {
  render() {
    return (
      <>
        <Route exact path="/dashboard/weather-forecast/map" render={props => <ForecastMap {...props}/>}/>
        <Route path="/dashboard/weather-forecast/bulletin" render={props => <ForecastBulletin {...props}/>}/>
      </>
    );
  }
}
