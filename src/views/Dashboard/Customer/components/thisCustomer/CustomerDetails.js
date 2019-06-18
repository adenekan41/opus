import React from "react";
import styled from "styled-components";
import { Box, Flex } from "rebass";
import Avatar from "../../../../../components/Avatar";
import CustomerDetailsForm from "./CustomerDetailsForm";
import toaster from "../../../../../components/Toaster";
import {
  errorCallback,
  setProfilePicture,
} from "../../../../../helpers/functions";

const CustomerDetailsStyle = styled.div`
  .card {
    border-radius: 3px;
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
    border: solid 0.5px rgba(18, 18, 18, 0.11);
    background-color: #ffffff;
  }

  .photo-section {
    width: 16vw;
    flex: 0 0 16vw;
  }

  .form-section {
    flex: 1;
  }
`;

class CustomerDetails extends React.Component {
  state = {
    files: [],
    profilePicture: "",
    loading: false,
    emailLoading: false,
    passwordLoading: false,
  };

  onProfileUpdate = values => {
    const { dispatch, actions } = this.props;

    this.setState({ loading: true });

    dispatch({
      type: actions.UPDATE_USER,
      value: values,
    })
      .then(() => {
        this.setState({
          loading: false,
        });
        toaster.success("Customer updated successful");
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        errorCallback(error);
      });
  };

  onEmailUpdate = (values, closeModal) => {
    const { dispatch, actions } = this.props;

    this.setState({ emailLoading: true });

    dispatch({ type: actions.PATCH_USER, value: values })
      .then(() => {
        this.setState({
          emailLoading: false,
        });
        closeModal();
        toaster.success("Customer updated successful");
      })
      .catch(error => {
        this.setState({
          emailLoading: false,
        });
        errorCallback(error);
      });
  };

  onPasswordUpdate = (values, closeModal) => {
    const { dispatch, actions } = this.props;

    this.setState({ passwordLoading: true });

    dispatch({ type: actions.PATCH_USER, value: values })
      .then(() => {
        this.setState({
          passwordLoading: false,
        });
        closeModal();
        toaster.success("Customer updated successful");
      })
      .catch(error => {
        this.setState({
          passwordLoading: false,
        });
        errorCallback(error);
      });
  };

  render() {
    const { profile_picture, first_name, last_name, ...rest } = this.props;
    const initials = `${first_name && first_name[0]}${last_name &&
      last_name[0]}`;

    return (
      <CustomerDetailsStyle>
        <Flex width="100%">
          <Box className="photo-section">
            <div className="card d-flex justify-content-center">
              <div className="card-body text-center">
                <center>
                  <Avatar
                    isRound
                    size="8vw"
                    photo_url={`${setProfilePicture(profile_picture)}`}
                    color="#ff9901"
                    bgColor="rgba(255,153,1,.15)"
                    initial={initials}
                  />
                </center>
              </div>
            </div>
          </Box>
          <Box mx="16px" />
          <Box className="form-section">
            <CustomerDetailsForm
              {...{
                first_name,
                last_name,
                ...rest,
              }}
              isLoading={this.state.loading}
              onSubmit={this.onProfileUpdate}
              onEmailChange={this.onEmailUpdate}
              emailLoading={this.state.emailLoading}
              onPasswordChange={this.onPasswordUpdate}
              passwordLoading={this.state.passwordLoading}
            />
          </Box>
        </Flex>
      </CustomerDetailsStyle>
    );
  }
}

export default CustomerDetails;
