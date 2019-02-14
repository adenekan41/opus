import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import PrimaryLayout from './shared/Layout/primaryLayout';
class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <PrimaryLayout />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
