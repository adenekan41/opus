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
import AutomaticAlertForm from './components/AutomaticAlertForm';
import AdvisoryAlertForm from './components/AdvisoryAlertForm';
import { Tabs } from '../../../components/TabNav';

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
                    <Tabs
                      defaultActiveTab="Manual alert"
                      isFitted={false}
                      showBorderBottom
                      tabSpacing="24px"
                      tabs={[
                        {
                          label: 'Manual alert',
                          content: (
                            <Box m="-12px">
                              <ManualAlertForm onCancel={closeModal} />
                            </Box>
                          ),
                        },
                        {
                          label: 'Automated alert',
                          content: (
                            <Box m="-12px">
                              <AutomaticAlertForm onCancel={closeModal} />
                            </Box>
                          ),
                        },
                        {
                          label: 'Advisory alert',
                          content: (
                            <Box m="-12px">
                              <AdvisoryAlertForm onCancel={closeModal} />
                            </Box>
                          ),
                        },
                      ]}
                      TabListCSS={`justify-content: space-between;`}
                      TabPanelCSS={`padding: 24px;`}
                    />
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
              renderButton={() => (
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
                        <Tabs
                          defaultActiveTab="Manual alert"
                          isFitted={false}
                          tabSpacing="24px"
                          tabs={[
                            {
                              label: 'Manual alert',
                              content: (
                                <Box m="-12px">
                                  <ManualAlertForm onCancel={closeModal} />
                                </Box>
                              ),
                            },
                            {
                              label: 'Automated alert',
                              content: (
                                <Box m="-12px">
                                  <AutomaticAlertForm onCancel={closeModal} />
                                </Box>
                              ),
                            },
                            {
                              label: 'Advisory alert',
                              content: (
                                <Box m="-12px">
                                  <AdvisoryAlertForm onCancel={closeModal} />
                                </Box>
                              ),
                            },
                          ]}
                          TabListCSS={`justify-content: initial;`}
                          TabPanelCSS={`padding: 24px;`}
                        />
                      </Modal>
                    </>
                  )}
                </ToggleModal>
              )}
            />
          )}
        </Box>
      </div>
    );
  }
}

export default Alerts;
