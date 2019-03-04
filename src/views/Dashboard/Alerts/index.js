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
  state = {
    loading: false,
  };
  sendWhatsappAlert = (values, callback) => {
    const { dispatch, actions } = this.props;
    const payload = { ...values, phone_number: values.phone_number[0] };
    this.setState({
      loading: true,
    });
    dispatch({ type: actions.SEND_WHATSAPP_ALERT, value: payload }).then(() => {
      this.setState({
        loading: false,
      });
      callback();
    });
  };
  getAlertContacts = alert => {
    const { contacts } = this.props;
    let phone_number = alert.phone_number || alert.request_data.phone_number;
    let contact = contacts.find(contact =>
      contact.phone_numbers.includes(phone_number)
    );
    if (contact) {
      return contact;
    }
    return {};
  };
  render() {
    const { alerts, contacts } = this.props;
    const { loading } = this.state;
    const formatContacts = contacts.map(contact => ({
      label: `${contact.first_name} ${contact.last_name}`,
      value: contact.phone_numbers[0],
    }));
    const formatAlerts = alerts.map(alert => {
      if(alert.request_data) {
        return {
          ...alert.request_data,
          type: 'whatsapp',
          to: this.getAlertContacts(alert),
          created_at: alert.created_at,
        }
      }
      return {
        ...alert,
        type: 'whatsapp',
        to: this.getAlertContacts(alert),
      }
    });
    return (
      <div style={{ padding: '40px' }}>
        <Box className="row" mb="40px">
          <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
            <SearchInput placeholder="Search messages" mb="8px" />
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
                              <ManualAlertForm
                                onCancel={closeModal}
                                isLoading={loading}
                                contacts={formatContacts}
                                onSubmit={this.sendWhatsappAlert}
                              />
                            </Box>
                          ),
                        },
                        {
                          label: 'Automated alert',
                          content: (
                            <Box m="-12px">
                              <AutomaticAlertForm
                                onCancel={closeModal}
                                isLoading={loading}
                              />
                            </Box>
                          ),
                        },
                        {
                          label: 'Advisory alert',
                          content: (
                            <Box m="-12px">
                              <AdvisoryAlertForm
                                onCancel={closeModal}
                                isLoading={loading}
                              />
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
            <AlertTables alerts={formatAlerts} />
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
                          TabListCSS={`justify-content: space-between;`}
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
