import React from "react";
import styled from "styled-components";
import { Box, Flex } from "rebass";
import Avatar from "../../../../../components/Avatar";
import CustomerDetailsForm from "./CustomerDetailsForm";
import toaster from "../../../../../components/Toaster";
import {
  errorCallback,
  setProfilePicture,
  getApiErrors,
} from "../../../../../helpers/functions";
import { Confirm } from "../../../../../components/Modal";

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
    apiErrors: {},
    profilePicture: "",
    loading: false,
    emailLoading: false,
    passwordLoading: false,
    deactivateLoading: false,
    showDeleteConfirm: false,
  };

  setApiErrors = errorPayload => {
    this.setState({
      apiErrors: errorPayload,
    });
  };

  deactivateAccount = () => {
    const { dispatch, actions, id, history } = this.props;
    this.setState({ deactivateLoading: true });
    dispatch({ type: actions.DELETE_USER, value: id })
      .then(() => {
        this.setState({
          deactivateLoading: false,
          showDeleteConfirm: false,
        });
        history.push("/dashboard/customers");
        toaster.success("Customer deactivated successfully")
      })
      .catch(error => {
        this.setState({
          deactivateLoading: false,
        });
        errorCallback(error, this.setApiErrors);
      });
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
        errorCallback(error, this.setApiErrors);
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
              deactivateAccount={() =>
                this.setState({ showDeleteConfirm: true })
              }
              isLoading={this.state.loading}
              onSubmit={this.onProfileUpdate}
              emailLoading={this.state.emailLoading}
              passwordLoading={this.state.passwordLoading}
              apiErrors={getApiErrors(this.state.apiErrors)}
            />
          </Box>
        </Flex>
        <Confirm
          confirmText="Deactivate"
          heading="Deactivate account"
          onConfirm={this.deactivateAccount}
          isLoading={this.state.deactivateLoading}
          showModal={this.state.showDeleteConfirm}
          onCloseModal={() => this.setState({ showDeleteConfirm: false })}
          description="Are you sure you want to deactivate this customer?"
        />
      </CustomerDetailsStyle>
    );
  }
}

export default CustomerDetails;
