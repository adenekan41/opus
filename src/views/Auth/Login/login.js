import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LoginLayout } from "./style";
import LoginForm from "./form";
import Header from "../../../components/Navbar";
import toaster from "../../../components/Toaster";

class Login extends Component {
  state = {
    loading: false,
  };
  login = payload => {
    // let requestPayload = {
    //   email: window.btoa(payload.email),
    //   password: window.btoa(payload.password),
    // };
    this.setState({ loading: true });
    this.props
      .onLogin(payload, () =>
        toaster.error("Unable to log in with provided credentials.")
      )
      .then(data => {
        this.setState({
          loading: false,
        });
        if (data) {
          this.props.history.push("/dashboard/weather-data/map");
        }
      })
      .catch(() => {
        toaster.error("Unable to log in with provided credentials.");
      });
  };
  render() {
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
      </>
    );
  }
}

export default Login;
