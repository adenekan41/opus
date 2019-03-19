import React, { Component } from 'react';
import Header from '../../../components/Navbar';
import { RecoverLayout } from './style';
import RecoverPasswordForm from './form';
import { Toast } from '../../../components/Toast';

class Recover extends Component {
  state = {
    loading: false,
    error: false,
    errorMessage: '',
  };
  resetPassword = payload => {
    this.setState({ loading: true, error: false });
    this.props
      .onResetPassword(payload, () => this.setState({ error: true }))
      .then(data => {
        this.setState({
          loading: false,
        });
        // if(data) {
        //   this.props.history.push('/dashboard/weather-data/map');
        // }
      });
  };

  render() {
    const { error, errorMessage, loading } = this.state;
    return (
      <>
        <RecoverLayout>
          <Header />
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
                  <RecoverPasswordForm
                    isLoading={loading}
                    onSubmit={this.resetPassword}
                  />
                </div>
                <div className="col" />
              </div>
            </div>
          </div>
        </RecoverLayout>

        {error && (
          <Toast
            showToast={error}
            title="Error"
            status="error"
            onClose={() => this.setState({ error: false })}
          >
            {errorMessage || 'Unable to log in with provided credentials.'}
          </Toast>
        )}
      </>
    );
  }
}

export default Recover;
