import React from 'react';
import ContactTable from './components/ContactTable';
import Modal, { ToggleModal } from '../../../components/Modal/index';
import SearchInput from '../../../components/SearchInput';
import Button from '../../../components/Button';
import ContactForm from './components/ContactForm';
import { Icon } from '../../../components/Icon';
import EmptyState from '../../../components/EmptyState';
import emptyStateImage from '../../../assets/img/empty-states/contacts.png';
import CreateContactButton from './components/CreateContactButton';
import { FullScreenSpinner } from '../../../components/Spinner';

class Contacts extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonLoading: false,
      loading: false,
    };
  }
  componentDidMount() {
    this.getContacts();
  }

  getContacts = () => {
    const { dispatch, actions } = this.props;
    this.setState({
      loading: true,
    });
    dispatch({ type: actions.GET_CONTACTS })
      .then(data => {
        console.log(data);
        this.setState({
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
      });
  };

  onContactCreate = values => {
    const { dispatch, actions } = this.props;
    this.setState({
      buttonLoading: true,
    });
    dispatch({ type: actions.CREATE_CONTACT, value: values })
      .then(data => {
        console.log(data);
        this.setState({
          buttonLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          buttonLoading: false,
        });
      });
  };

  onContactEdit = (contact, callback) => {
    const { dispatch, actions } = this.props;
    this.setState({
      buttonLoading: true,
    });
    dispatch({ type: actions.UPDATE_CONTACT, value: contact })
      .then(data => {
        console.log(data);
        this.setState({
          buttonLoading: false,
        });
        callback();
      })
      .catch(err => {
        this.setState({
          buttonLoading: false,
        });
      });
  };

  onContactDelete = (contact, callback) => {
    const { dispatch, actions } = this.props;
    this.setState({
      buttonLoading: true,
    });
    dispatch({ type: actions.DELETE_CONTACT, value: contact.id })
      .then(data => {
        console.log(data);
        this.setState({
          buttonLoading: false,
        });
        callback();
      })
      .catch(err => {
        this.setState({
          buttonLoading: false,
        });
      });
  };

  render() {
    const { profile, contacts } = this.props;
    let { buttonLoading, loading } = this.state;
    let isAdmin = profile.username === 'admin';
    return (
      <div>
        <div style={{ padding: '40px' }}>
          <div className="row">
            <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
              <SearchInput placeholder="Search contacts" />
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <CreateContactButton
                isAdmin={isAdmin}
                isLoading={buttonLoading}
                onSubmit={this.onContactCreate}
              />
            </div>
          </div>
          {loading ? (
            <FullScreenSpinner />
          ) : contacts.length > 0 ? (
            <ContactTable
              contacts={contacts}
              isLoading={buttonLoading}
              onContactEdit={this.onContactEdit}
              onContactDelete={this.onContactDelete}
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
                  isAdmin={isAdmin}
                  isLoading={buttonLoading}
                  onSubmit={this.onContactCreate}
                />
              )}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Contacts;
