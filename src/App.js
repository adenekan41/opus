import React, { Component } from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import './App.css';
import PrimaryLayout from './shared/Layout/primaryLayout';
import DashboardLayout from './shared/Layout/DashboardLayout';
import Login from './views/Auth/Login/login'
class App extends Component {
  render() {
    return (
     
      <Router>
        <React.Fragment>
        <PrimaryLayout></PrimaryLayout>          
          
        </React.Fragment>
      </Router>
      
    );
  }
}

export default App;
