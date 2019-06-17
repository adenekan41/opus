import React, { Component } from "react";
import { Box } from "rebass";
import Header from "../../../components/Navbar";
import { RecoverLayout } from "./style";
import RecoverPasswordForm from "./form";
import { errorCallback, getAllUrlParams } from "../../../helpers/functions";
import Button from "../../../components/Button";

class Recover extends Component {
  state = {
    loading: false,
    section: "form",
  };

  resetPassword = payload => {
    const { onResetPassword, location } = this.props;
    const params = getAllUrlParams(location.search);
    const id = params && params.uuid;

    this.setState({ loading: true });

    onResetPassword({ password: payload.password, id })
      .then(() => {
        this.setState({
          loading: false,
          section: "success",
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        errorCallback(error);
      });
  };

  goToLogin = () => {
    this.props.history.push("/");
  };

  render() {
    const { loading, section } = this.state;

    return (
      <>
        <RecoverLayout>
          <Header />
          <div className="RecoverBody Recover__opus-insight">
            <div className="container">
              {section === "form" && (
                <>
                  <h1 className="text-center">Welcome!</h1>
                  <p className="text-center">
                    Create a password to begin using your account.
                  </p>
                  <div className="row">
                    <div className="col" />
                    <Box className="col-md-5" mt={5}>
                      <RecoverPasswordForm
                        isLoading={loading}
                        onSubmit={this.resetPassword}
                      />
                    </Box>
                    <div className="col" />
                  </div>
                </>
              )}

              {section === "success" && (
                <>
                  <h1 className="text-center">Password Saved</h1>
                  <p className="text-center">Please login.</p>
                  <div className="row">
                    <div className="col" />
                    <div className="col-md-5">
                      <Button size="large" block onClick={this.goToLogin}>
                        Login
                      </Button>
                    </div>
                    <div className="col" />
                  </div>
                </>
              )}
            </div>
          </div>
        </RecoverLayout>
      </>
    );
  }
}

export default Recover;
