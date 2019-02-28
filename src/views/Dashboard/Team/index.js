import React from 'react';
import { Text } from 'rebass';
import TeamTable from './components/TeamTable';
import Modal, { ToggleModal } from '../../../components/Modal/index';
import SearchInput from '../../../components/SearchInput';
import { Icon } from '../../../components/Icon';
import Button from '../../../components/Button';
import AdminTeamTable from './components/AdminTeamTable';
import TeamForm from './components/TeamForm';
import EmptyState from '../../../components/EmptyState';
import emptyStateImage from '../../../assets/img/empty-states/contacts.png';

class Teams extends React.Component {
  constructor() {
    super();

    this.state = {
      isShowing: false,
      header: 'Invite team member',
      userdata: null,
    };
  }
  onTeamEdit = team => {
    console.log(team);
  };
  onTeamDelete = team => {
    console.log(team);
  };
  render() {
    const { profile, users } = this.props;
    let isAdmin = profile.username === 'admin';
    return (
      <div>
        <div style={{ padding: '40px' }}>
          <div className="row">
            <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
              <SearchInput placeholder="Search team members" />
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <ToggleModal>
                {(show, openModal, closeModal) => (
                  <>
                    <Button onClick={openModal} kind="green" block>
                      <Icon name="add" color="#ffffff" /> &nbsp;&nbsp;
                      {isAdmin
                        ? `Invite user`
                        : `Invite
                      team member`}
                    </Button>
                    <Modal
                      size="medium"
                      showModal={show}
                      onCloseModal={closeModal}
                      heading={this.state.header}
                    >
                      <Text textAlign="center" mb="24px">
                        Please enter the email address of the team member you
                        would like to invite.
                      </Text>
                      <TeamForm isAdd onCancel={closeModal} />
                    </Modal>
                  </>
                )}
              </ToggleModal>
            </div>
          </div>
          <br /> <br />
          {users.length > 0 ? (
            isAdmin ? (
              <AdminTeamTable
                onTeamDelete={this.onTeamDelete}
                onTeamEdit={this.onTeamEdit}
              />
            ) : (
              <TeamTable
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
                <ToggleModal>
                  {(show, openModal, closeModal) => (
                    <>
                      <Button onClick={openModal} kind="green" block>
                        <Icon name="add" color="#ffffff" /> &nbsp;&nbsp;
                        {isAdmin
                          ? `Invite user`
                          : `Invite
                        team member`}
                      </Button>
                      <Modal
                        size="medium"
                        showModal={show}
                        onCloseModal={closeModal}
                        heading={this.state.header}
                      >
                        <Text textAlign="center" mb="24px">
                          Please enter the email address of the team member you
                          would like to invite.
                        </Text>
                        <TeamForm isAdd onCancel={closeModal} />
                      </Modal>
                    </>
                  )}
                </ToggleModal>
              )}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Teams;
