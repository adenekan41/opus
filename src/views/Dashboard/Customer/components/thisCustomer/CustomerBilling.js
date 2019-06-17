import React from "react";
import CustomerBillingForm from "./CustomerBillingForm";
import toaster from "../../../../../components/Toaster";
import { errorCallback } from "../../../../../helpers/functions";

class CustomerBilling extends React.Component {
  state = {
    loading: false,
  };

  onCustomerUpdate = values => {
    const { dispatch, actions, getCustomer } = this.props;
    const id =
      window.location.pathname && window.location.pathname.split("/")[3];

    this.setState({ loading: true });

    dispatch({
      type: actions.PATCH_USER,
      value: values,
    })
      .then(() => {
        this.setState({
          loading: false,
        });
        toaster.success("Customer updated successful");
        getCustomer(id)
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        errorCallback(error);
      });
  };

  render() {
    return (
      <CustomerBillingForm
        {...{
          ...this.props,
          onSubmit: this.onCustomerUpdate,
          isLoading: this.state.loading,
        }}
      />
    );
  }
}

export default CustomerBilling;
