import React from "react";
import UserTable from "./components/UserTable";
import CreateButton from "./components/CreateButton";
import UserForm from "./components/UserForm";
import SearchInput from "../../../components/Search";
import EmptyState from "../../../components/EmptyState";
import emptyStateImage from "../../../assets/img/empty-states/contacts.png";
import Modal, { Confirm } from "../../../components/Modal";
import toaster from "../../../components/Toaster";
import { getApiErrors, errorCallback } from "../../../helpers/functions";
import { FullScreenSpinner } from "../../../components/Spinner";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      apiErrors: {},
      userToEdit: {},
      loading: false,
      userToDelete: {},
      showEditModal: false,
      searchLoading: false,
      showDeleteConfirm: false,
    };
  }

  handleSearchChange = value => {
    this.setState({
      search: value,
    });
  };

  handleEditClick = values => {
    this.setState({
      userToEdit: values,
      showEditModal: true,
      apiErrors: {},
    });
  };

  handleDeleteClick = values => {
    this.setState({
      userToDelete: values,
      showDeleteConfirm: true,
      apiErrors: {},
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

  onUserCreate = (values, closeModal) => {
    const { dispatch, actions, profile } = this.props;
    const payload = profile.is_superuser
      ? {
          ...values,
          password: "password",
          is_admin: true,
          weather_stations: [],
        }
      : {
          ...values,
          password: "password",
          is_employee: true,
          weather_stations: [],
        };

    this.setState({
      loading: true,
    });

    dispatch({ type: actions.CREATE_USER, value: payload })
      .then(() => {
        this.setState({
          loading: false,
        });
        closeModal();
        toaster.success("User created successfully");
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        errorCallback(error, this.setApiErrors);
      });
  };

  onUserEdit = (values, closeModal) => {
    const { dispatch, actions } = this.props;
    this.setState({
      loading: true,
    });
    dispatch({
      type: actions.PATCH_USER,
      value: values,
    })
      .then(() => {
        this.setState({ loading: false });
        closeModal();
        toaster.success("User updated successfully");
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        errorCallback(error, this.setApiErrors);
      });
  };

  onUserDelete = (id, closeConfirm) => {
    const { dispatch, actions } = this.props;
    this.setState({
      loading: true,
    });
    dispatch({ type: actions.DELETE_USER, value: id })
      .then(() => {
        this.setState({
          loading: false,
        });
        closeConfirm();
        toaster.success("User deleted successfully");
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        errorCallback(error, this.setApiErrors);
      });
  };

  onUserSearch = e => {
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
    const {
      loading,
      apiErrors,
      userToEdit,
      userToDelete,
      searchLoading,
      showEditModal,
      showDeleteConfirm,
    } = this.state;
    const { users } = this.props;

    return (
      <>
        <div style={{ padding: "40px" }}>
          <div className="row">
            <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
              <form onSubmit={e => this.onUserSearch(e)}>
                <SearchInput
                  mb="8px"
                  placeholder="Search first name, last name, email"
                  onChange={e => this.handleSearchChange(e.target.value)}
                />
              </form>
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <CreateButton
                apiErrors={getApiErrors(apiErrors)}
                isLoading={this.state.loading}
                onSubmit={this.onUserCreate}
              />
            </div>
          </div>
          <br /> <br />
          {searchLoading ? (
            <FullScreenSpinner
              size={32}
              thickness="4px"
              height="calc(100vh - 140px)"
              width="calc(100% - 344px)"
            />
          ) : users.length > 0 ? (
            <UserTable
              teams={users}
              onUserEdit={this.handleEditClick}
              onUserDelete={this.handleDeleteClick}
            />
          ) : (
            <EmptyState
              image={emptyStateImage}
              margin="80px"
              heading="No Users"
              helpText="You haven’t invited any user yet,
              click the button below to invite someone."
              renderButton={() => (
                <CreateButton
                  apiErrors={getApiErrors(apiErrors)}
                  isLoading={this.state.loading}
                  onSubmit={this.onUserCreate}
                />
              )}
            />
          )}
        </div>

        <Modal
          showModal={showEditModal}
          heading="Edit User"
          onCloseModal={this.closeEditModal}
          size="medium"
        >
          <UserForm
            {...userToEdit}
            isLoading={loading}
            onSubmit={this.onUserEdit}
            onCancel={this.closeEditModal}
            apiErrors={getApiErrors(apiErrors)}
          />
        </Modal>

        <Confirm
          showModal={showDeleteConfirm}
          heading="Delete user"
          onConfirm={() => {
            this.onUserDelete(userToDelete.id, this.closeDeleteConfirm);
          }}
          isLoading={loading}
          onCloseModal={this.closeDeleteConfirm}
          description="Are you sure you want to delete this user?"
        />
      </>
    );
  }
}

export default Users;
