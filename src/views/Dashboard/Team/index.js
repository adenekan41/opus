import React from "react";
import UserTable from "./components/UserTable";
import CreateButton from "./components/CreateButton";
import UserForm from "./components/UserForm";
import SearchInput from "../../../components/Search";
import EmptyState from "../../../components/EmptyState";
import emptyStateImage from "../../../assets/img/empty-states/contacts.png";
import Modal, { Confirm } from "../../../components/Modal";
import toaster from "../../../components/Toaster";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showEditModal: false,
      showDeleteConfirm: false,
      userToEdit: {},
      userToDelete: {},
      users: this.props.users,
    };
  }

  handleEditClick = values => {
    this.setState({
      userToEdit: values,
      showEditModal: true,
    });
  };

  handleDeleteClick = values => {
    this.setState({
      userToDelete: values,
      showDeleteConfirm: true,
    });
  };

  closeEditModal = () => {
    this.setState({ showEditModal: false });
  };

  closeDeleteConfirm = () => {
    this.setState({ showDeleteConfirm: false });
  };

  onUserCreate = (values, closeModal) => {
    const { dispatch, actions } = this.props;
    let payload = {
      ...values,
      password: "password",
      is_admin: true,
    };
    this.setState({
      loading: true,
    });
    dispatch({ type: actions.CREATE_USER, value: payload })
      .then(data => {
        console.log(data);
        this.setState({
          loading: false,
        });
        closeModal();
      })
      .catch(error => {
        const errorPayload = error.response.data;
        this.setState({
          loading: false,
        });
        toaster.error(errorPayload && errorPayload.detail);
      });
  };

  onUserEdit = (values, closeModal) => {
    const { dispatch, actions } = this.props;
    this.setState({
      loading: true,
    });
    dispatch({ type: actions.PATCH_USER, value: values })
      .then(() => {
        this.setState({ loading: false });
        closeModal();
      })
      .catch((error) => {
        const errorPayload = error.response.data;
        this.setState({
          loading: false,
        });
        toaster.error(errorPayload && errorPayload.detail);
      });
  };

  onUserDelete = (id, callback) => {
    const { dispatch, actions } = this.props;
    this.setState({
      loading: true,
    });
    dispatch({ type: actions.DELETE_USER, value: id })
      .then(() => {
        this.setState({
          loading: false,
        });
        callback();
      })
      .catch((error) => {
        const errorPayload = error.response.data;
        this.setState({
          loading: false,
        });
        toaster.error(errorPayload && errorPayload.detail);
      });
  };

  onUserSearch = value => {
    if (value) {
      const { users } = this.state;
      const filteredUsers = users.filter(
        user =>
          user.first_name.toLowerCase().includes(value) ||
          user.last_name.toLowerCase().includes(value)
      );
      this.setState({
        users: filteredUsers,
      });
      // if (filteredUsers.length === 0) {
      //   this.setState({
      //     users: this.props.users,
      //   });
      // }
    } else {
      this.setState({
        users: this.props.users,
      });
    }
  };

  render() {
    const {
      users,
      loading,
      userToEdit,
      userToDelete,
      showDeleteConfirm,
      showEditModal,
    } = this.state;

    return (
      <>
        <div style={{ padding: "40px" }}>
          <div className="row">
            <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
              <SearchInput
                mb="8px"
                placeholder="Search users"
                onChange={e => this.onUserSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <CreateButton
                isLoading={this.state.loading}
                onSubmit={this.onUserCreate}
              />
            </div>
          </div>
          <br /> <br />
          {users.length > 0 ? (
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
          />
        </Modal>

        <Confirm
          showModal={showDeleteConfirm}
          heading="Delete user"
          onConfirm={() => {
            this.onUserDelete(userToDelete.id);
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
