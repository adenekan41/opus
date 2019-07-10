import Axios from "axios";
import React from "react";
import { Heading } from "rebass";
import emptyStateImage from "../../../assets/img/empty-states/contacts.png";
import EmptyState from "../../../components/EmptyState";
import Modal, { Confirm } from "../../../components/Modal";
import SearchInput from "../../../components/Search";
import { FullScreenSpinner } from "../../../components/Spinner";
import toaster from "../../../components/Toaster";
import { errorCallback, getApiErrors } from "../../../helpers/functions";
import { loadState } from "../../../localStorage";
import ContactForm from "./components/ContactForm";
import ContactTable from "./components/ContactTable";
import CreateContactButton from "./components/CreateContactButton";
import UploadContactsButton from "./components/UploadContactsButton";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      search: "",
      apiErrors: {},
      contactToEdit: {},
      contactToDelete: {},
      searchLoading: false,
      buttonLoading: false,
      showEditModal: false,
      showDeleteConfirm: false,
      contactsUploadErrors: null,
    };
  }

  handleEditClick = values => {
    this.setState({
      apiErrors: {},
      contactToEdit: values,
      showEditModal: true,
    });
  };

  handleDeleteClick = values => {
    this.setState({
      apiErrors: {},
      contactToDelete: values,
      showDeleteConfirm: true,
    });
  };

  handleSearchChange = value => {
    this.setState({
      search: value,
    });
  };

  closeEditModal = () => {
    this.setState({ showEditModal: false, apiErrors: {} });
  };

  closeDeleteConfirm = () => {
    this.setState({ showDeleteConfirm: false });
  };

  setApiErrors = errorPayload => {
    this.setState({
      apiErrors: errorPayload,
    });
  };

  onContactCreate = (values, callback) => {
    const { dispatch, actions, profile } = this.props;
    let { phone_number, ...rest } = values;
    let isAdmin = profile.is_admin || profile.is_superuser;
    let payload = {
      ...rest,
      phone_numbers: [phone_number],
    };
    if (!isAdmin) {
      delete payload.customer;
    }
    this.setState({
      buttonLoading: true,
    });
    dispatch({ type: actions.CREATE_CONTACT, value: payload })
      .then(() => {
        this.setState({
          buttonLoading: false,
        });
        callback();
        toaster.success("User created successfully");
      })
      .catch(error => {
        this.setState({
          buttonLoading: false,
        });
        errorCallback(error, this.setApiErrors);
      });
  };

  onContactEdit = values => {
    const { dispatch, actions } = this.props;
    let { phone_number, ...rest } = values;
    let payload = {
      ...rest,
      phone_numbers: [phone_number],
    };
    this.setState({
      buttonLoading: true,
    });
    dispatch({ type: actions.UPDATE_CONTACT, value: payload })
      .then(() => {
        this.setState({
          buttonLoading: false,
          contactToEdit: {},
          showEditModal: false,
        });
        toaster.success("Contact updated successfully");
      })
      .catch(error => {
        this.setState({
          buttonLoading: false,
        });
        errorCallback(error, this.setApiErrors);
      });
  };

  onContactDelete = id => {
    const { dispatch, actions } = this.props;
    this.setState({
      buttonLoading: true,
    });
    dispatch({ type: actions.DELETE_CONTACT, value: id })
      .then(() => {
        this.setState({
          buttonLoading: false,
          contactToDelete: {},
          showDeleteConfirm: false,
        });
        toaster.success("Contact deleted successfully");
      })
      .catch(error => {
        this.setState({
          buttonLoading: false,
        });
        errorCallback(error, this.setApiErrors);
      });
  };

  onContactsUpload = (files, callback) => {
    let data = new FormData();
    let auth =
      (loadState() || { auth: { token: "" } } || { auth: { token: "" } })
        .auth || "";

    this.setState({ percent: 0 });

    files.forEach(file => {
      data.append("file", file, file.name);
    });

    const url = `${process.env.REACT_APP_BASE_URL}/contacts/import-contacts/`;
    const { dispatch, actions } = this.props;

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `JWT ${auth.token}`,
      },
      onUploadProgress: progressEvent => {
        var percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (percent >= 100) {
          this.setState({ percent: 100 });
        } else {
          this.setState({ percent });
        }
      },
    };

    Axios.post(url, data, config)
      .then(() => {
        dispatch({
          type: actions.GET_CONTACTS,
          value: { token: auth.token, refresh: true },
        }).then(() => {
          this.setState({ percent: 0, contactsUploadErrors: null });
          toaster.success("Contact created successfully");
          callback && callback();
        });
      })
      .catch(error => {
        this.setState({ percent: 0 });
        if (
          error &&
          error.response &&
          error.response.data &&
          typeof error.response.data === "object"
        ) {
          let { row_number, message } = error.response.data;
          this.setState({
            contactsUploadErrors: { row_number, message },
          });
        } else {
          toaster.error("An error occurred, please try again");
        }
      });
  };

  onContactSearch = e => {
    e.preventDefault();
    const { dispatch, actions } = this.props;
    this.setState({
      searchLoading: true,
    });
    dispatch({ type: actions.SEARCH_CONTACTS, value: this.state.search })
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
    const { profile, assets, users, contacts } = this.props;
    let {
      percent,
      apiErrors,
      buttonLoading,
      contactToEdit,
      showEditModal,
      searchLoading,
      contactToDelete,
      showDeleteConfirm,
      contactsUploadErrors
    } = this.state;
    let isAdmin = profile.is_admin || profile.is_superuser;
    let crops = assets
      .filter(asset => asset.is_crop)
      .map(crop => ({ label: crop.name, value: crop.id }));
    let countries = assets
      .filter(asset => asset.is_country)
      .map(country => ({ label: country.name, value: country.id }));
    let customers = users
      .filter(user => user.is_customer)
      .map(customer => ({
        label: `${customer.first_name} ${customer.last_name}`,
        value: customer.id,
      }));

    return (
      <>
        <div style={{ padding: "40px" }}>
          <Heading pb="40px">Contacts</Heading>
          <div className="row">
            <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6">
              <form onSubmit={e => this.onContactSearch(e)}>
                <SearchInput
                  mb="8px"
                  placeholder="Type first name, last name or email and press enter"
                  onChange={e => this.handleSearchChange(e.target.value)}
                />
              </form>
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <CreateContactButton
                mb="8px"
                crops={crops}
                isAdmin={isAdmin}
                countries={countries}
                customers={customers}
                isLoading={buttonLoading}
                onSubmit={this.onContactCreate}
                apiErrors={getApiErrors(apiErrors)}
              />
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <UploadContactsButton
                mb="8px"
                isAdmin={isAdmin}
                progress={percent}
                error={contactsUploadErrors}
                onSubmit={this.onContactsUpload}
                sampleFile="/static/files/contacts.csv"
                closeErrorAlert={() => this.setState({ contactsUploadErrors: null })}
              />
            </div>
          </div>
          {searchLoading ? (
            <FullScreenSpinner
              size={32}
              thickness="4px"
              height="calc(100vh - 140px)"
              width="calc(100% - 344px)"
            />
          ) : contacts.length > 0 ? (
            <ContactTable
              crops={crops}
              pageSize={20}
              isAdmin={isAdmin}
              contacts={contacts}
              customers={customers}
              countries={countries}
              onContactEdit={this.handleEditClick}
              onContactDelete={this.handleDeleteClick}
            />
          ) : (
            <EmptyState
              image={emptyStateImage}
              margin="80px"
              heading="No Contacts"
              helpText="You haven’t added any contacts yet,
              click the button below to add a new one."
              renderButton={() => (
                <CreateContactButton
                  crops={crops}
                  isAdmin={isAdmin}
                  customers={customers}
                  countries={countries}
                  isLoading={buttonLoading}
                  onSubmit={this.onContactCreate}
                  apiErrors={getApiErrors(apiErrors)}
                />
              )}
            />
          )}
        </div>

        <Modal
          showModal={showEditModal}
          heading="Edit Contact"
          onCloseModal={this.closeEditModal}
          size="medium"
        >
          <ContactForm
            {...contactToEdit}
            crops={crops}
            isAdmin={isAdmin}
            countries={countries}
            customers={customers}
            isLoading={buttonLoading}
            onSubmit={this.onContactEdit}
            onCancel={this.closeEditModal}
            apiErrors={getApiErrors(apiErrors)}
          />
        </Modal>

        <Confirm
          showModal={showDeleteConfirm}
          heading="Delete Contact"
          onConfirm={() => {
            this.onContactDelete(contactToDelete.id);
          }}
          isLoading={buttonLoading}
          onCloseModal={this.closeDeleteConfirm}
          description="Are you sure you want to delete this contact?"
        />
      </>
    );
  }
}

export default Contacts;
