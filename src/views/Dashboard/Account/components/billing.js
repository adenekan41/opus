import React from "react";
import styled from "styled-components";
import BillingForm from "./BillingForm";
import toaster from "../../../../components/Toaster";

const BillingStyle = styled.div`
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

class Billing extends React.Component {
  state = {
    loading: false,
  };

  onProfileUpdate = values => {
    const { dispatch, actions } = this.props;
    this.setState({ loading: true });
    return dispatch({ type: actions.UPDATE_PROFILE, value: values })
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

  render() {
    const { profile } = this.props;
    return (
      <BillingStyle>
        <BillingForm {...profile} onSubmit={this.onProfileUpdate} />
      </BillingStyle>
    );
  }
}

export default Billing;
