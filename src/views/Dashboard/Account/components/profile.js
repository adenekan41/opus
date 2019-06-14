import React from "react";
import styled from "styled-components";
import { Box, Flex } from "rebass";
import Avatar from "../../../../components/Avatar";
import ProfileForm from "./ProfileForm";
import Button from "../../../../components/Button";
import toaster from "../../../../components/Toaster";
import { FileUploader } from "../../../../components/FileUpload";
import { getBase64Url } from "../../../../helpers/functions";
const ProfileStyle = styled.div`
  .card {
    border-radius: 3px;
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
    border: solid 0.5px rgba(18, 18, 18, 0.11);
    background-color: #ffffff;
    button.btn-success {
      background: #29cb98;
      border-radius: 3px;
      border: none;
      padding: 12px;
    }
    button.btn-dark {
      background: #000 !important;
      border-radius: 3px;
      border: none;
      padding: 12px;
      opacity: 1;
    }
  }
  .footer_button button.btn-warning {
    background: #ff9901;
    color: #fff;
  }
  .footer_button button.btn-danger {
    background: #f66262;
  }
  .footer_button button.btn-warning {
    background: #ff9901;
    color: #fff;
  }

  .footer_button button {
    padding: 16px;
    border: none;
    border-radius: 3px;
  }
  .change_photo input {
    position: absolute;
    left: 0;
    width: 100%;
    background: white;
    opacity: 0;
    height: 50px;
  }
  .button_height {
    padding: 19px 0px;
    border-radius: 0px !important;
    border: none;
    font-size: 14px;
  }
  .photo-section {
    width: 12vw;
    flex: 0 0 18vw;
  }
  .form-section {
    flex: 1;
  }
`;
class Profile extends React.Component {
  state = {
    files: [],
    profilePicture: "",
    loading: false,
    emailLoading: false,
    passwordLoading: false,
  };

  onProfileUpdate = values => {
    const { dispatch, actions, profile } = this.props;
    const { profilePicture } = this.state;
    const payload = profile.profile_picture
      ? values
      : { ...values, profile_picture: profilePicture };

    this.setState({ loading: true });
    return dispatch({
      type: actions.UPDATE_PROFILE,
      value: payload,
    })
      .then(() => {
        this.setState({
          loading: false,
        });
        toaster.success("Profile update successful");
      })
      .catch(error => {
        const errorPayload = error.response.data;
        this.setState({
          loading: false,
        });
        toaster.error(errorPayload && errorPayload.detail);
      });
  };

  onEmailUpdate = (values, closeModal) => {
    const { dispatch, actions } = this.props;
    this.setState({ emailLoading: true });
    return dispatch({ type: actions.UPDATE_PROFILE, value: values })
      .then(() => {
        this.setState({
          emailLoading: false,
        });
        closeModal();
        toaster.success("Profile update successful");
      })
      .catch(error => {
        const errorPayload = error.response.data;
        this.setState({
          emailLoading: false,
        });
        toaster.error(errorPayload && errorPayload.detail);
      });
  };

  onPasswordUpdate = (values, closeModal) => {
    const { dispatch, actions } = this.props;
    this.setState({ passwordLoading: true });
    return dispatch({ type: actions.UPDATE_PROFILE, value: values })
      .then(() => {
        this.setState({
          passwordLoading: false,
        });
        closeModal();
        toaster.success("Profile update successful");
      })
      .catch(error => {
        const errorPayload = error.response.data;
        this.setState({
          passwordLoading: false,
        });
        toaster.error(errorPayload && errorPayload.detail);
      });
  };

  setProfilePicture = file => {
    this.setState({
      profilePicture: file,
    });
  };

  onPhotoDrop = acceptedFiles => {
    const filesWithPreview = acceptedFiles.map(file => {
      getBase64Url(file, this.setProfilePicture);
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    });
    this.setState({
      files: filesWithPreview,
    });
  };

  render() {
    const { profile, clearAllState } = this.props;
    const image = this.state.files.length > 0 && this.state.files[0];
    const initials =
      Object.values(profile).length > 0
        ? `${profile.first_name && profile.first_name[0]}${profile.last_name &&
            profile.last_name[0]}`
        : ``;

    return (
      <ProfileStyle>
        <div style={{ padding: "0px" }}>
          <Flex width="100%">
            <Box className="photo-section">
              <div className="card d-flex justify-content-center">
                <div className="card-body text-center">
                  <center>
                    <Avatar
                      isRound
                      size="8vw"
                      photo_url={`${process.env.REACT_APP_API_URL}${profile.profile_picture}` || image.preview}
                      color="#ff9901"
                      bgColor="rgba(255,153,1,.15)"
                      initial={initials}
                    />
                  </center>
                  <br />
                  <div className="change_photo">
                    <FileUploader accept="image/*" onUpload={this.onPhotoDrop}>
                      {() => (
                        <Button width="220px" kind="green">
                          Change photo
                        </Button>
                      )}
                    </FileUploader>
                  </div>
                  <Button onClick={clearAllState} width="100%" mt="16px">
                    Log out
                  </Button>
                </div>
              </div>
            </Box>
            <Box mx="32px" />
            <Box className="form-section">
              <ProfileForm
                {...profile}
                isLoading={this.state.loading}
                onSubmit={this.onProfileUpdate}
                onEmailChange={this.onEmailUpdate}
                emailLoading={this.state.emailLoading}
                onPasswordChange={this.onPasswordUpdate}
                passwordLoading={this.state.passwordLoading}
              />
            </Box>
          </Flex>
        </div>
      </ProfileStyle>
    );
  }
}

export default Profile;
