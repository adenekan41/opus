import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Spinner from '../Layout/spinner';
// import axios from 'axios';
import { LoginLayout } from './style';
import Header from '../../../components/Navbar';
class Login extends Component {
  render() {
    return (
      <LoginLayout>
      	<Header />
        <div className="loginBody login__opus-insight">
          <div className="container">
            <div className="row">
              <div className="col" />
              <div className="col-md-5">
                <h1 className="text-center">Welcome back!</h1>
                <p className="text-center">
                  Login to continue using your account.
                </p>
                <form action="">
                  <div class="div_input border_none">
                    <label for="">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="johndoe@gmail.com"
                    />
                  </div>
                  <div class="div_input">
                    <label for="">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="*******"
                    />
                  </div>
                  <button class="btn btn-dark btn-block">Login</button>
                  <br />
                  <p className="text-center">
                    <Link to={`/recover`}>Forgot password ?</Link>
                  </p>
                </form>
              </div>
              <div className="col" />
            </div>
          </div>
        </div>
      </LoginLayout>
    );
  }
}

export default Login;
