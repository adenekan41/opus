import React from 'react';
import styled from 'styled-components';
import Avatar from '../../../../components/Avatar';
const ProfileStyle = styled.div`
.card{
   border-radius: 3px;
  box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
  border: solid 0.5px rgba(18, 18, 18, 0.11);
  background-color: #ffffff;
  button.btn-success{
    background:#29cb98;
    border-radius:3px;
    border:none;
    padding:12px
  }
   button.btn-dark{
    background:#000 !important;
    border-radius:3px;
    border:none;
    padding:12px;
    opacity:1
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
.div_input label {
    margin-bottom: 0;
    margin-left: 1rem;
    font-size:13px;
    margin-top: .5rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: 0.2px;
    color: #b4b4b4;

}
.div_input input {
    border: none;
    font-size: 15px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.18;
    letter-spacing: 0.2px;
    color: #242424;
    box-shadow: none !important;
    padding: 6px 17px !important;
}

.div_input {
    padding: 1px;
    background: #fff;
    margin-bottom:3%;
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
    border-top: 1px solid #e9e9e9 !important;
}
.div_input:hover  {
    border-left: 3px solid #19272D !important;
}
.change_photo input {
    position: absolute;
    left: 0;
    width: 100%;
    background: white;
    opacity: 0;
    height: 50px;
}
.button_height{
      padding: 19px 0px;
    border-radius: 0px !important;
    border: none;
    font-size: 14px;
}
`;
class Profile extends React.Component {
 
  render() {
     const defaultStyle = {
       background: '#29cb98',
      borderColor: '#29cb98',
      padding:"11px"
    }
    return (
      <ProfileStyle>
     
      <div style={{ padding: '0px' }}>
        <div className="row">
          <div className="col-md-3">
            <div className="card d-flex justify-content-center">
              <div className="card-body text-center">
                <center><Avatar
                  isRound
                  size="129px"
                  photo_url=""
                  color="#ff9901"
                  bgColor="rgba(255,153,1,.15)"
                  initial={`${'J'}${'D'}`}
                /></center>
                <br />
                <div className="change_photo">
                  <input type="file"/>
                  <button className="btn btn-success btn-block">Change photo</button>
                  
                </div>
                 <button className="btn btn-dark btn-block mt-3">Log out</button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col">
                <div className="div_input border_none">
                    <label for="">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John"
                    />
                  </div>
              </div>
              <div className="col">
                <div className="div_input border_none">
                    <label for="">Middle Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Doe"
                    />
                  </div>
              </div>
              <div className="col">
                <div className="div_input border_none">
                    <label for="">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="David"
                    />
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="div_input border_none">
                    <label for="">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="+225 706 566 5050"
                    />
                  </div>
              </div>
              <div className="col-md-8">
                <div className="div_input border_none">
                    <label for="">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Entebbe, Uganda"
                    />
                  </div>
              </div>

                
            </div>
            <br />
            <hr />
            <br />
            <div className="row ">
                <div className="col-md-4">
                    <div className="div_input border_none">
                      <label for="">Email Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-dark btn-block button_height">Change Email Address</button>
                </div>
                <div className="col-md-5"></div>
                 <div className="col-md-4">
                    <div className="div_input border_none">
                      <label for="">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="***********"
                      />
                    </div>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-dark btn-block button_height">Change Email Address</button>
                </div>
                <div className="col-md-5"></div>
            </div>
            <br />
            <hr />
            
            <div className="footer_button mt-3">
              <div className="row">
                <div className="col-md-4">
                  <button className="btn btn-danger btn-block">Deactivate Account</button>
                </div>
                <div className="col-md-8">
                  <button className="btn btn-warning btn-block">Save Changes</button>
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
