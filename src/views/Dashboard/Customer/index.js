import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Customers from './components/Customer'
import CustomerBulletin from './components/thisCustomer'
import NewCustomer from "./components/NewCustomer";

export default class Customer extends Component {
  render() {
    return (
      <>
        <Route
          exact
          path="/dashboard/customers"
          render={props => <Customers {...props} {...this.props}/>}
        />
        <Route
          exact
          path="/dashboard/customers/new"
          render={props => <NewCustomer {...props} {...this.props}/>}
        />
        <Route
          path="/dashboard/customers/bulletin"
          render={props => <CustomerBulletin {...props} {...this.props} />}
        />
      </>
    );
  }
}
