import React from "react";
import styled from "styled-components";
import { Box, Flex } from "rebass";
import Avatar from "../../../../components/Avatar";
import ProfileForm from "./ProfileForm";
import Button from "../../../../components/Button";
import toaster from "../../../../components/Toaster";
import { FileUploader } from "../../../../components/FileUpload";
import {
  getBase64Url,
  setProfilePicture,
  errorCallback,
} from "../../../../helpers/functions";
import { Confirm } from "../../../../components/Modal";

const ProfileStyle = styled.div`
  .card {
    border-radius: 3px;
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
    border: solid 0.5px rgba(18, 18, 18, 0.11);
    background-color: #ffffff;
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
    loading: false,
    profilePicture: "",
    passwordLoading: false,
    deactivateLoading: false,
    showDeleteConfirm: false,
  };

  onProfileUpdate = values => {
    const { dispatch, actions, profile } = this.props;
    const { profilePicture } = this.state;
    const payload = profile.profile_picture
      ? values
      : { ...values, profile_picture: profilePicture };

    this.setState({ loading: true });
    dispatch({
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
        this.setState({
          loading: false,
        });
        errorCallback(error);
      });
  };

  onPasswordUpdate = (values, closeModal) => {
    const { dispatch, actions } = this.props;
    this.setState({ passwordLoading: true });
    dispatch({ type: actions.UPDATE_PROFILE, value: values })
      .then(() => {
        this.setState({
          passwordLoading: false,
        });
        closeModal();
        toaster.success("Profile update successful");
      })
      .catch(error => {
        this.setState({
          passwordLoading: false,
        });
        errorCallback(error);
      });
  };

  deactivateAccount = () => {
    const { dispatch, actions, history, clearAllState } = this.props;
    this.setState({ deactivateLoading: true });
    dispatch({ type: actions.UPDATE_PROFILE, value: { is_active: false } })
      .then(() => {
        this.setState({
          deactivateLoading: false,
          showDeleteConfirm: false,
        });
        clearAllState();
        history.push("/");
      })
      .catch(error => {
        this.setState({
          deactivateLoading: false,
        });
        errorCallback(error);
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
    const profilePhoto = setProfilePicture(profile.profile_picture);

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
                      photo_url={
                        profilePhoto
                          ? `${process.env.REACT_APP_API_URL}${profilePhoto}`
                          : "" || image.preview
                      }
                      color="#ff9901"
                      bgColor="rgba(255,153,1,.15)"
                      initial={initials}
                    />
                  </center>
                  <br />
                  <div className="change_photo">
                    <FileUploader accept="image/*" onUpload={this.onPhotoDrop}>
                      {() => (
                        <Button block kind="green">
                          Change photo
                        </Button>
                      )}
                    </FileUploader>
                  </div>
                  <Button onClick={clearAllState} block mt="16px">
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
                onPasswordChange={this.onPasswordUpdate}
                passwordLoading={this.state.passwordLoading}
                deactivateAccount={() => this.setState({ showDeleteConfirm: true })}
              />
            </Box>
          </Flex>
        </div>
        <Confirm
          heading="Deactivate account"
          onConfirm={this.deactivateAccount}
          isLoading={this.state.deactivateLoading}
          showModal={this.state.showDeleteConfirm}
          onCloseModal={() => this.setState({ showDeleteConfirm: false })}
          description="Are you sure you want to deactivate your account?"
        />
      </ProfileStyle>
    );
  }
}

export default Profile;
