import React from "react";
import ContactTable from "./components/ContactTable";
import SearchInput from "../../../components/SearchInput";
import EmptyState from "../../../components/EmptyState";
import emptyStateImage from "../../../assets/img/empty-states/contacts.png";
import CreateContactButton from "./components/CreateContactButton";
import { countries, getCitites } from "../../../helpers/countries";
import UploadContactsButton from "./components/UploadContactsButton";
import Axios from "axios";
import Modal, { Confirm } from "../../../components/Modal";
import ContactForm from "./components/ContactForm";

class Contacts extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonLoading: false,
      showEditModal: false,
      showDeleteConfirm: false,
      cities: [],
      percent: 0,
      contactToEdit: {},
      contactToDelete: {},
    };
  }

  getCountryCities = country => {
    this.setState({
      cities: getCitites(country.toLowerCase()),
    });
  };

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
      })
      .catch(() => {
        this.setState({
          buttonLoading: false,
        });
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
      })
      .catch(() => {
        this.setState({
          buttonLoading: false,
        });
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
      })
      .catch(() => {
        this.setState({
          buttonLoading: false,
        });
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
      .catch(error => {
        console.log(error);
        this.setState({ percent: 0 });
      });
  };

  render() {
    const { profile, contacts, crops } = this.props;
    let {
      buttonLoading,
      cities,
      percent,
      contactToEdit,
      contactToDelete,
      showEditModal,
      showDeleteConfirm,
    } = this.state;
    let isAdmin = profile.username === "admin";
    let formatCrops = crops.map(crop => ({
      label: crop.name,
      value: crop.name,
    }));
    return (
      <>
        <div style={{ padding: "40px" }}>
          <div className="row">
            <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6">
              <SearchInput placeholder="Search contacts" mb="8px" />
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <CreateContactButton
                mb="8px"
                cities={cities}
                isAdmin={false}
                crops={formatCrops}
                countries={countries}
                isLoading={buttonLoading}
                onSubmit={this.onContactCreate}
                getCountryCities={this.getCountryCities}
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
              cities={cities}
              isAdmin={isAdmin}
              contacts={contacts}
              countries={countries}
              onContactEdit={this.handleEditClick}
              onContactDelete={this.handleDeleteClick}
              getCountryCities={this.getCountryCities}
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
                  cities={cities}
                  isAdmin={isAdmin}
                  crops={formatCrops}
                  countries={countries}
                  isLoading={buttonLoading}
                  onSubmit={this.onContactCreate}
                  getCountryCities={this.getCountryCities}
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
            cities={cities}
            onSubmit={this.onContactEdit}
            isAdmin={isAdmin}
            countries={countries}
            onCancel={this.closeEditModal}
            isLoading={buttonLoading}
            getCountryCities={this.getCountryCities}
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
