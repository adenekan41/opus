import React from 'react';
import TeamTable from './components/TeamTable';
import SearchInput from '../../../components/SearchInput';
import AdminTeamTable from './components/AdminTeamTable';
import EmptyState from '../../../components/EmptyState';
import emptyStateImage from '../../../assets/img/empty-states/contacts.png';
import CreateButton from './components/CreateButton';

class Teams extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  onUserCreate = (values, callback) => {
    const { dispatch, actions } = this.props;
    let payload = { ...values, password: 'password', is_superuser: false };
    this.setState({
      loading: true,
    });
    dispatch({ type: actions.CREATE_USER, value: payload })
      .then((data) => {
        console.log(data)
        this.setState({
          loading: false,
        });
        callback();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  };

  onTeamEdit = (values, callback) => {
    const { dispatch, actions } = this.props;
    this.setState({
      loading: true,
    });
    dispatch({ type: actions.PATCH_USER, value: values })
      .then(() => {
        this.setState({ loading: false });
        callback();
      })
      .catch(() =>
        this.setState({
          loading: false,
        })
      );
  };

  onTeamDelete = (id, callback) => {
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
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const { profile, users } = this.props;
    let isAdmin = profile.username === 'admin';
    return (
      <div>
        <div style={{ padding: '40px' }}>
          <div className="row">
            <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
              <SearchInput placeholder="Search team members" mb="8px" />
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <CreateButton
                isAdmin={isAdmin}
                isLoading={this.state.loading}
                onSubmit={this.onUserCreate}
              />
            </div>
          </div>
          <br /> <br />
          {users.length > 0 ? (
            isAdmin ? (
              <AdminTeamTable
                teams={users}
                onTeamDelete={this.onTeamDelete}
                onTeamEdit={this.onTeamEdit}
              />
            ) : (
              <TeamTable
                teams={users}
                onTeamDelete={this.onTeamDelete}
                onTeamEdit={this.onTeamEdit}
              />
            )
          ) : (
            <EmptyState
              image={emptyStateImage}
              margin="80px"
              heading="No Team Members"
              helpText="You haven’t invited any team members yet,
              click the button below to invite someone."
              renderButton={() => (
                <CreateButton
                  isAdmin={isAdmin}
                  isLoading={this.state.loading}
                  onSubmit={this.onUserCreate}
                />
              )}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Teams;
