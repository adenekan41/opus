import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import Header from '../../components/Navbar';
// import Footer from './Footer';
import register from '../../views/Auth/register/register'
const DashboardLayout = props => ({
  render() {
    return (
      
        
        <React.Fragment>
        <Header />
        <div className="container">
        <h1>Dashboard</h1>
        <main><Switch>
          <Route path="/register" exact component={register} />
    
         
        </Switch></main>
        </div>
        
        </React.Fragment>
        
      
    );
  }
});

export default DashboardLayout;