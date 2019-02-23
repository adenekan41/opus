import React from 'react';
import styled from 'styled-components';
import Avatar from '../../../../components/Avatar';
const OragnisationStyle = styled.div`

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

`;
class Organisation extends React.Component {
 
  render() {
     const defaultStyle = {
       background: '#29cb98',
      borderColor: '#29cb98',
      padding:"11px"
    }
    return (
      <OragnisationStyle>
     
      <div style={{ padding: '0px' }}>
        <div className="row">
          
          <div className="col-md-6">
            <div className="row">
            <div className="col-md-12">
             <div className="div_input border_none">
                <label for="">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Royal Navy Consulting"
                />
              </div>
              </div>
              <div className="col-md-6">
                <div className="div_input border_none">
                    <label for="">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Uganda"
                    />
                  </div>
              </div>
              <div className="col-md-6">
                <div className="div_input border_none">
                    <label for="">City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Anabel"
                    />
                  </div>
              </div>
              <div className="col-md-6">
                <div className="div_input border_none">
                    <label for="">Zip code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="554453"
                    />
                  </div>
              </div>
              <div className="col-md-6">
                <div className="div_input border_none">
                    <label for="">Plot Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="14"
                    />
                  </div>
              </div>
              <div className="col-md-12">
                <div className="div_input border_none">
                  <label for="">Street</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Royal Navy Consulting"
                  />
                </div>
              </div>
            </div>
            <hr />

            
            
            <div className="footer_button mt-3">
              <div className="row">
                
                <div className="col-md-12">
                  <button className="btn btn-warning btn-block">Save Changes</button>
                </div>
              </div>
            </div>
            </div>
      
              
          
        </div>
        </div>
      
   
      </OragnisationStyle>
    );
  }
}

export default Organisation;
