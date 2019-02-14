import React, { Component } from 'react';
// import Spinner from '../Layout/spinner';
// import axios from 'axios';
import './recover.css';
class Recover extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="RecoverBody Recover__opus-insight">
          <div className="container">
            <h1 className="text-center">Recover password</h1>
            <p className="text-center">
              Type in the email address associated with your account to get a
              recovery link.
            </p>
            <div className="row">
              <div className="col" />
              <div className="col-md-5">
                <form action="">
                  <div class="div_input border_none">
                    <label for="">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="johndoe@gmail.com"
                    />
                  </div>

                  <button class="btn btn-dark btn-block">
                    Recover password
                  </button>
                  <br />
                </form>
              </div>
              <div className="col" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Recover;
