import React from "react";
import { Heading } from "rebass";
import emptyStateImage from "../../../../assets/img/empty-states/contacts.png";
import Button from "../../../../components/Button";
import EmptyState from "../../../../components/EmptyState";
import { Icon } from "../../../../components/Icon";
import { Confirm } from "../../../../components/Modal";
import SearchInput from "../../../../components/Search";
import { FullScreenSpinner } from "../../../../components/Spinner";
import toaster from "../../../../components/Toaster";
import { errorCallback } from "../../../../helpers/functions";
import CustomerTable from "./CustomersTable";

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      searchLoading: false,
      showDeleteConfirm: false,
      customerToDelete: {},
      search: "",
    };
  }

  handleSearchChange = value => {
    this.setState({
      search: value,
    });
  };

  handleDeleteClick = values => {
    this.setState({
      customerToDelete: values,
      showDeleteConfirm: true,
      apiErrors: {},
    });
  };

  newCustomer = () => {
    this.props.history.push("/dashboard/customers/new");
  };

  onCustomerEdit = values => {
    this.props.history.push(`/dashboard/customers/${values.id}/edit`);
  };

  onCustomerDelete = (id) => {
    const { dispatch, actions } = this.props;
    this.setState({
      buttonLoading: true,
    });
    dispatch({ type: actions.DELETE_USER, value: id })
      .then(() => {
        this.setState({
          buttonLoading: false,
          userToDelete: {},
          showDeleteConfirm: false
        });
        toaster.success("Customer deleted successfully");
      })
      .catch(error => {
        this.setState({
          buttonLoading: false,
        });
        errorCallback(error, this.setApiErrors);
      });
  };

  onCustomerSearch = e => {
    e.preventDefault();
    const { dispatch, actions } = this.props;
    this.setState({
      searchLoading: true,
    });
    dispatch({ type: actions.SEARCH_USERS, value: this.state.search })
      .then(() => {
        this.setState({
          search: "",
          searchLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          searchLoading: false,
        });
        errorCallback(error);
      });
  };

  render() {
    const { profile, users, assets } = this.props;
    let { buttonLoading, searchLoading, customerToDelete, showDeleteConfirm } = this.state;
    let isAdmin = profile.username === "admin";
    let customers = users.filter(user => user.is_customer);
    let formatCrops = assets
      .filter(asset => asset.is_crop)
      .map(crop => ({ label: crop.name, value: crop.id }));
    let countries = assets
      .filter(asset => asset.is_country)
      .map(country => ({ label: country.name, value: country.id }));

    return (
      <div style={{ padding: "40px" }}>
      <Heading pb="40px">Customers</Heading>
        <div className="row">
          <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
            <form onSubmit={e => this.onCustomerSearch(e)}>
              <SearchInput
                mb="8px"
                placeholder="Type first name or last name and press enter"
                onChange={e => this.handleSearchChange(e.target.value)}
              />
            </form>
          </div>
          <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
            <Button kind="green" block onClick={this.newCustomer}>
              <Icon name="add" color="#ffffff" />
              &nbsp;&nbsp;Add Customers
            </Button>
          </div>
        </div>

        {searchLoading ? (
          <FullScreenSpinner
            size={32}
            thickness="4px"
            height="calc(100vh - 140px)"
            width="calc(100% - 344px)"
          />
        ) : customers.length > 0 ? (
          <CustomerTable
            isAdmin={isAdmin}
            customers={customers}
            crops={formatCrops}
            countries={countries}
            isLoading={buttonLoading}
            onCustomerEdit={this.onCustomerEdit}
            onCustomerDelete={this.handleDeleteClick}
          />
        ) : (
          <EmptyState
            image={emptyStateImage}
            margin="80px"
            heading="No Customers Yet"
            helpText="You haven’t added any customers yet,
              click the button below to add a new one."
            renderButton={() => (
              <Button kind="green" block onClick={this.newCustomer}>
                <Icon name="add" color="#ffffff" />
                &nbsp;&nbsp;Add Customers
              </Button>
            )}
          />
        )}

        <Confirm
          showModal={showDeleteConfirm}
          heading="Delete customer"
          onConfirm={() => {
            this.onCustomerDelete(customerToDelete.id);
          }}
          isLoading={buttonLoading}
          onCloseModal={() => this.setState({ showDeleteConfirm: false })}
          description="Are you sure you want to delete this customer?"
        />
      </div>
    );
  }
}

export default Customers;
