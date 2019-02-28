import React from 'react';
import ContactTable from './components/ContactTable';
import Modal, { ToggleModal } from '../../../components/Modal/index';
import SearchInput from '../../../components/SearchInput';
import Button from '../../../components/Button';
import ContactForm from './components/ContactForm';
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
    const { profile } = this.props;
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
                      <i className="ion-ios-plus" />
                      &nbsp;&nbsp;Add contact
                    </Button>
                    <Modal
                      size="medium"
                      showModal={show}
                      onCloseModal={closeModal}
                      heading={"Add Contact"}
                    >
                      <ContactForm isAdmin={isAdmin} onCancel={closeModal} />
                    </Modal>
                  </>
                )}
              </ToggleModal>
            </div>
          </div>
          <br /> <br />
          <ContactTable
            onContactDelete={this.onContactDelete}
            onContactEdit={this.onContactEdit}
          />
        </div>
      </div>
    );
  }
}

export default Contacts;
