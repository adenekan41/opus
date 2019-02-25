import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LoginLayout } from './style';
import LoginForm from './form';
import Header from '../../../components/Navbar';
import { Toast } from '../../../components/Toast';

class Login extends Component {
  state = {
    loading: false,
    error: false,
    errorMessage: ''
  };
  login = payload => {
    this.setState({ loading: true, error: false });
    this.props
      .onLogin(payload, () => this.setState({ error: true }))
      .then((data) => {
        this.setState({
          loading: false,
        });
        if(data) {
          this.props.history.push('/dashboard/weather-forecast/map');
        }
      });
  };
  render() {
    const { error, errorMessage } = this.state;
    return (
      <>
        <LoginLayout>
          <Header />
          <div className="loginBody login__opus-insight">
            <div className="loginBody__container">
              <h1 className="text-center">Welcome back!</h1>
              <p className="text-center">
                Login to continue using your account.
              </p>
              <LoginForm onSubmit={this.login} isLoading={this.state.loading} />
              <br />
              <p className="text-center">
                <Link to={`/recover`}>Forgot password ?</Link>
              </p>
            </div>
          </div>
        </LoginLayout>

        {error && (
          <Toast
            showToast={error}
            title="Error"
            status="error"
            onClose={() => this.setState({ error: false })}
          >
            {errorMessage || "Unable to log in with provided credentials."}
          </Toast>
        )}
      </>
    );
  }
}

export default Login;
