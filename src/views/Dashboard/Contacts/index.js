import React from "react";
import ContactTable from "./components/ContactTable";
import EmptyState from "../../../components/EmptyState";
import emptyStateImage from "../../../assets/img/empty-states/contacts.png";
import CreateContactButton from "./components/CreateContactButton";
import UploadContactsButton from "./components/UploadContactsButton";
import Axios from "axios";
import Modal, { Confirm } from "../../../components/Modal";
import ContactForm from "./components/ContactForm";
import SearchInput from "../../../components/Search";
import toaster from "../../../components/Toaster";
import { errorCallback } from "../../../helpers/functions";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      showEditModal: false,
      showDeleteConfirm: false,
      percent: 0,
      apiErrors: {},
      contactToEdit: {},
      contactToDelete: {},
      contacts: this.props.contacts,
    };
  }

  handleEditClick = values => {
    this.setState({
      contactToEdit: values,
      showEditModal: true,
    });
  };

  handleDeleteClick = values => {
    this.setState({
      contactToDelete: values,
      showDeleteConfirm: true,
    });
  };

  closeEditModal = () => {
    this.setState({ showEditModal: false });
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
    const { dispatch, actions } = this.props;
    let { phone_number, secondary_phone_number, ...rest } = values;
    let payload = {
      ...rest,
      phone_numbers: [phone_number, secondary_phone_number],
    };
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
      .catch((error) => {
        this.setState({
          buttonLoading: false,
        });
        errorCallback(error, this.setApiErrors)
      });
  };

  onContactEdit = values => {
    const { dispatch, actions } = this.props;
    let { phone_number, secondary_phone_number, ...rest } = values;
    let payload = {
      ...rest,
      phone_numbers: [phone_number, secondary_phone_number],
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
    this.setState({ percent: 0 });
    let data = new FormData();
    files.forEach(file => {
      data.append("file", file, file.name);
    });

    const url = `${process.env.REACT_APP_BASE_URL}/contacts/import-contacts/`;
    const { dispatch, actions } = this.props;

    const config = {
      headers: { "content-type": "multipart/form-data" },
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
        dispatch({ type: actions.GET_CONTACTS, value: { refresh: true } }).then(
          () => {
            this.setState({ percent: 0 });
            callback && callback();
          }
        );
      })
      .catch(() => {
        this.setState({ percent: 0 });
        toaster.error("An error occurred, please try again");
      });
  };

  onContactSearch = value => {
    if (value) {
      const { contacts } = this.state;
      const filteredContacts = contacts.filter(
        contact =>
          contact.first_name.toLowerCase().includes(value) ||
          contact.last_name.toLowerCase().includes(value)
      );
      this.setState({
        contacts: filteredContacts,
      });
      // if (filteredContacts.length === 0) {
      //   this.setState({
      //     contacts: this.props.contacts,
      //   });
      // }
    } else {
      this.setState({
        contacts: this.props.contacts,
      });
    }
  };

  render() {
    const { profile, crops } = this.props;
    let {
      percent,
      contacts,
      buttonLoading,
      contactToEdit,
      showEditModal,
      contactToDelete,
      showDeleteConfirm,
    } = this.state;
    let isAdmin = profile.is_admin;
    let formatCrops = crops.map(crop => ({
      label: crop.name,
      value: crop.name,
    }));
    return (
      <>
        <div style={{ padding: "40px" }}>
          <div className="row">
            <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6">
              <SearchInput
                mb="8px"
                placeholder="Search contacts"
                onChange={e => this.onContactSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <CreateContactButton
                mb="8px"
                isAdmin={isAdmin}
                crops={formatCrops}
                isLoading={buttonLoading}
                onSubmit={this.onContactCreate}
              />
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <UploadContactsButton
                mb="8px"
                isAdmin={isAdmin}
                progress={percent}
                onSubmit={this.onContactsUpload}
                sampleFile="/static/files/contacts.csv"
              />
            </div>
          </div>
          {contacts.length > 0 ? (
            <ContactTable
              isAdmin={isAdmin}
              contacts={contacts}
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
                  isAdmin={isAdmin}
                  crops={formatCrops}
                  isLoading={buttonLoading}
                  onSubmit={this.onContactCreate}
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
            isLoading={buttonLoading}
            onSubmit={this.onContactEdit}
            onCancel={this.closeEditModal}
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
