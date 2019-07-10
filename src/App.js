import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PrimaryLayout from './shared/Layout/primaryLayout';
import { loadState, saveState, clearState } from './localStorage';
import { hasExpired } from "./helpers/functions";

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
      if (hasExpired(auth.token)) {
        clearState();
        return false;
      } else {
        return true;
      }
    }
  };
  
  getAdapter = () => {
    return this.props.adapter;
  };

  onLogin = (payload, errorCallback = () => {}) => {
    return this.getAdapter()
      .login(payload)
      .then(data => {
        const { token, opus1_token } = data;
        this.setState({
          token,
          opus1_token
        });
        saveState({
          auth: { token, opus1_token },
        });
        return token;
      })
      .catch(error => errorCallback(error));
  };

  onResetPassword = (payload) => {
    return this.getAdapter()
      .setNewUserPassword(payload)
      .then(data => {
        return data;
      })
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
            onLogin={this.onLogin}
            token={this.state.token}
            isLoggedIn={this.isLoggedIn}
            clearAllState={this.clearAllState}
            opus1_token={this.state.opus1_token}
            onResetPassword={this.onResetPassword}
          />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
