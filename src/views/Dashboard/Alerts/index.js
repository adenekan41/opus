import React from 'react';
import { Box } from 'rebass';
import AlertTables from './components/alertTables';
import SearchInput from '../../../components/SearchInput';
import Button from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import EmptyState from '../../../components/EmptyState';
import emptyStateImage from '../../../assets/img/empty-states/alerts.png';
import Modal, { ToggleModal } from '../../../components/Modal';
import ManualAlertForm from './components/ManualAlertForm';

class Alerts extends React.Component {
  render() {
    const { alerts } = this.props;
    return (
      <div style={{ padding: '40px' }}>
        <Box className="row" mb="40px">
          <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
            <SearchInput placeholder="Search messages" />
          </div>
          <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
            <ToggleModal>
              {(show, openModal, closeModal) => (
                <>
                  <Button kind="green" block onClick={openModal}>
                    <Icon name="add" color="#ffffff" />
                    &nbsp;&nbsp;New Alert
                  </Button>
                  <Modal
                    size="medium"
                    showModal={show}
                    onCloseModal={closeModal}
                  >
                    <ManualAlertForm onCancel={closeModal}/>
                  </Modal>
                </>
              )}
            </ToggleModal>
          </div>
        </Box>
        <Box>
          {alerts.length > 0 ? (
            <AlertTables alerts={alerts} />
          ) : (
            <EmptyState
              image={emptyStateImage}
              margin="80px"
              heading="No Messages"
              helpText="You haven’t sent any alerts yet,
                click the button below to send one now."
            />
          )}
        </Box>
      </div>
    );
  }
}

export default Alerts;
