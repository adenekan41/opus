import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import PrimaryLayout from './shared/Layout/primaryLayout';
import { loadState, saveState, clearState } from './localStorage';

class App extends Component {
  state = {
    token: '',
  };
  isLoggedIn = () => {
    let auth =
      (loadState() || { auth: { token: '' } } || { auth: { token: '' } })
        .auth || '';
    if (!!auth.token === false) {
      return false;
    } else {
      return true;
    }
  };
  getAdapter = () => {
    return this.props.adapter;
  };
  onLogin = (payload, errorCallback = () => {}) => {
    return this.getAdapter()
      .login(payload)
      .then(data => {
        const { token } = data;
        this.setState({
          token,
        });
        saveState({
          auth: { token },
        });
        return token;
      })
      .catch(error => errorCallback(error));
  };
  onResetPassword = (payload, errorCallback = () => {}) => {
    return this.getAdapter()
      .resetPassword(payload)
      .then(data => {
        console.log(data)
      })
      .catch(error => errorCallback(error));
  };
  clearAllState = history => {
    clearState();
    history.push('/');
  };
  render() {
    return (
      <Router>
        <React.Fragment>
          <PrimaryLayout
            token={this.state.token}
            onLogin={this.onLogin}
            isLoggedIn={this.isLoggedIn}
            onResetPassword={this.onResetPassword}
            clearAllState={this.clearAllState}
          />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
