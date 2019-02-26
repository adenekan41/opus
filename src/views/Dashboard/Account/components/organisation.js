import React from 'react';
import styled from 'styled-components';
import OrganizationForm from './OrganizationForm';
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
    font-size: 13px;
    margin-top: 0.5rem;
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
    margin-bottom: 3%;
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
    border-top: 1px solid #e9e9e9 !important;
  }
  .div_input:hover {
    border-left: 3px solid #19272d !important;
  }
`;
class Organisation extends React.Component {
  render() {
    return (
      <OragnisationStyle>
        <div style={{ padding: '0px' }}>
        <OrganizationForm/>
        </div>
      </OragnisationStyle>
    );
  }
}

export default Organisation;
