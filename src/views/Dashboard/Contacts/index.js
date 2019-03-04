import React from 'react';
import ContactTable from './components/ContactTable';
import SearchInput from '../../../components/SearchInput';
import EmptyState from '../../../components/EmptyState';
import emptyStateImage from '../../../assets/img/empty-states/contacts.png';
import CreateContactButton from './components/CreateContactButton';
import { FullScreenSpinner } from '../../../components/Spinner';
import { countries, getCitites } from '../../../helpers/countries';

class Contacts extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonLoading: false,
      loading: false,
      cities: [],
    };
  }

  componentDidMount() {
    this.getContacts();
  }

  getCountryCities = country => {
    this.setState({
      cities: getCitites(country.toLowerCase()),
    });
  };

  getContacts = () => {
    const { dispatch, actions } = this.props;
    this.setState({
      loading: true,
    });
    dispatch({ type: actions.GET_CONTACTS })
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  };

  onContactCreate = (values, callback) => {
    const { dispatch, actions } = this.props;
    let { phone_number, secondary_phone_number, ...rest } = values;
    let payload = {
      ...rest,
      phone_numbers: [phone_number, secondary_phone_number],
    };
    this.setState({
      buttonLoading: true,
    });
    dispatch({ type: actions.CREATE_CONTACT, value: payload })
      .then(() => {
        this.setState({
          buttonLoading: false,
        });
        callback();
      })
      .catch(() => {
        this.setState({
          buttonLoading: false,
        });
      });
  };

  onContactEdit = (values, callback) => {
    const { dispatch, actions } = this.props;
    let { phone_number, secondary_phone_number, ...rest } = values;
    let payload = {
      ...rest,
      phone_numbers: [phone_number, secondary_phone_number],
    };
    this.setState({
      buttonLoading: true,
    });
    dispatch({ type: actions.UPDATE_CONTACT, value: payload })
      .then(() => {
        this.setState({
          buttonLoading: false,
        });
        callback();
      })
      .catch(() => {
        this.setState({
          buttonLoading: false,
        });
      });
  };

  onContactDelete = (id, callback) => {
    const { dispatch, actions } = this.props;
    this.setState({
      buttonLoading: true,
    });
    dispatch({ type: actions.DELETE_CONTACT, value: id })
      .then(() => {
        this.setState({
          buttonLoading: false,
        });
        callback();
      })
      .catch(() => {
        this.setState({
          buttonLoading: false,
        });
      });
  };

  render() {
    const { profile, contacts, crops } = this.props;
    let { buttonLoading, loading, cities } = this.state;
    let isAdmin = profile.username === 'admin';
    let formatCrops = crops.map(crop => ({
      label: crop.name,
      value: crop.name,
    }));
    return (
      <div>
        <div style={{ padding: '40px' }}>
          <div className="row">
            <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
              <SearchInput placeholder="Search contacts" mb="8px" />
            </div>
            <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
              <CreateContactButton
                mb="8px"
                cities={cities}
                isAdmin={isAdmin}
                crops={formatCrops}
                countries={countries}
                isLoading={buttonLoading}
                onSubmit={this.onContactCreate}
                getCountryCities={this.getCountryCities}
              />
            </div>
          </div>
          {loading ? (
            <FullScreenSpinner />
          ) : contacts.length > 0 ? (
            <ContactTable
              cities={cities}
              isAdmin={isAdmin}
              contacts={contacts}
              crops={formatCrops}
              countries={countries}
              isLoading={buttonLoading}
              onContactEdit={this.onContactEdit}
              onContactDelete={this.onContactDelete}
              getCountryCities={this.getCountryCities}
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
                  cities={cities}
                  isAdmin={isAdmin}
                  crops={formatCrops}
                  countries={countries}
                  isLoading={buttonLoading}
                  onSubmit={this.onContactCreate}
                  getCountryCities={this.getCountryCities}
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
