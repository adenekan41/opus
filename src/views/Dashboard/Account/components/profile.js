import React from "react";
import styled from "styled-components";
import { Box, Flex } from "rebass";
import Avatar from "../../../../components/Avatar";
import ProfileForm from "./ProfileForm";
import Button from "../../../../components/Button";
import toaster from "../../../../components/Toaster";
import { FileUploader } from "../../../../components/FileUpload";
import { getBase64Url, setProfilePicture, errorCallback } from "../../../../helpers/functions";

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
    profilePicture: "",
    loading: false,
    passwordLoading: false,
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
