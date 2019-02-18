import React from 'react';
import ContactTable from './components/ContactTable';

class Contacts extends React.Component {
  onContactEdit = contact => {
    console.log(contact);
  };
  onContactDelete = contact => {
    console.log(contact);
  };
  render() {
    return (
      <ContactTable
        onContactDelete={this.onContactDelete}
        onContactEdit={this.onContactEdit}
      />
    );
  }
}

export default Contacts;
