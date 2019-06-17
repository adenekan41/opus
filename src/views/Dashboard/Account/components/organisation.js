import React from "react";
import OrganizationForm from "./OrganizationForm";
import toaster from "../../../../components/Toaster";

class Organisation extends React.Component {
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
    const { profile, assets } = this.props;
    const countries = assets
      .filter(asset => asset.is_country)
      .map(({ name, id }) => ({ label: name, value: id }));

    return (
      <OrganizationForm
        {...profile}
        countries={countries}
        isLoading={this.state.loading}
        onSubmit={this.onProfileUpdate}
      />
    );
  }
}

export default Organisation;
