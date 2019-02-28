import React from 'react';
import ContactTable from './components/ContactTable';
import Modal, { ToggleModal } from '../../../components/Modal/index';
import SearchInput from '../../../components/SearchInput';
import Button from '../../../components/Button';
import ContactForm from './components/ContactForm';
import { Icon } from '../../../components/Icon';
import EmptyState from '../../../components/EmptyState';
import emptyStateImage from '../../../assets/img/empty-states/contacts.png';

class Contacts extends React.Component {
  constructor() {
    super();

    this.state = {
      isShowing: false,
      header: 'Edit Contact',
      userdata: null,
    };
  }

  onContactEdit = contact => {
    console.log(contact);
  };

  onContactDelete = contact => {
    console.log(contact);
  };

  render() {
    const { profile, contacts } = this.props;
    let isAdmin = profile.username === 'admin';
    return (
      <div>
        <div style={{ padding: '40px' }}>
          <div className="row">
            <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
              <SearchInput placeholder="Search contacts" />
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <ToggleModal>
                {(show, openModal, closeModal) => (
                  <>
                    <Button kind="green" block onClick={openModal}>
                      <Icon name="add" color="#ffffff" />
                      &nbsp;&nbsp;Add contact
                    </Button>
                    <Modal
                      size="medium"
                      showModal={show}
                      onCloseModal={closeModal}
                      heading={'Add Contact'}
                    >
                      <ContactForm isAdmin={isAdmin} onCancel={closeModal} />
                    </Modal>
                  </>
                )}
              </ToggleModal>
            </div>
          </div>
          {contacts.length > 0 ? (
            <ContactTable
              onContactDelete={this.onContactDelete}
              onContactEdit={this.onContactEdit}
              contacts={contacts}
            />
          ) : (
            <EmptyState
              image={emptyStateImage}
              margin="80px"
              heading="No Contacts"
              helpText="You haven’t added any contacts yet,
              click the button below to add a new one."
              renderButton={() => (
                <ToggleModal>
                  {(show, openModal, closeModal) => (
                    <>
                      <Button kind="green" block onClick={openModal}>
                        Add contact
                      </Button>
                      <Modal
                        size="medium"
                        showModal={show}
                        onCloseModal={closeModal}
                        heading={'Add Contact'}
                      >
                        <ContactForm isAdmin={isAdmin} onCancel={closeModal} />
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

export default Contacts;
