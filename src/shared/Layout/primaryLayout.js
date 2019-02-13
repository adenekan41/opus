import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import Header from '../../components/Navbar';
// import Footer from './Footer';
import Login from '../../views/Auth/Login/login';
import Recover from '../../views/Auth/Recover/Recover';
import DashboardLayout from '../../shared/Layout/DashboardLayout';
const PrimaryLayout = props => ({
  render() {
    return (
      
        
        <React.Fragment>
        <Header />
        <main>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/recover" component={Recover} />
         <Route path="/dashboard" component={DashboardLayout} />
        </Switch>
        </main>
        </React.Fragment>
        
      
    );
  }
});

export default PrimaryLayout;