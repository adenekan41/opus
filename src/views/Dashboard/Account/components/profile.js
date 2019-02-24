import React from 'react';
import styled from 'styled-components';
import { Box } from 'rebass';
import Avatar from '../../../../components/Avatar';
import ProfileForm from './ProfileForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';
import Button from '../../../../components/Button';
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
`;
class Profile extends React.Component {
  render() {
    const { profile, clearAllState } = this.props;
    return (
      <ProfileStyle>
        <div style={{ padding: '0px' }}>
          <div className="row">
            <div className="col-md-3">
              <div className="card d-flex justify-content-center">
                <div className="card-body text-center">
                  <center>
                    <Avatar
                      isRound
                      size="100px"
                      photo_url={profile.photo}
                      color="#ff9901"
                      bgColor="rgba(255,153,1,.15)"
                      initial={`${'J'}${'D'}`}
                    />
                  </center>
                  <br />
                  <div className="change_photo">
                    <input type="file" />
                    <button className="btn btn-success btn-block">
                      Change photo
                    </button>
                  </div>
                  <Button onClick={clearAllState} width="100%" mt="16px">
                    Log out
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <ProfileForm {...profile} />
              <br />
              <hr />
              <br />
              <ChangeEmailForm email={profile.email}/>
              <Box mt="20px">
              <ChangePasswordForm/>

              </Box>
              <br />
              <hr />

              <div className="footer_button mt-3">
                <div className="row">
                  <div className="col-md-4">
                    <button className="btn btn-danger btn-block">
                      Deactivate Account
                    </button>
                  </div>
                  <div className="col-md-8">
                    <button className="btn btn-warning btn-block">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProfileStyle>
    );
  }
}

export default Profile;
