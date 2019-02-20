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
      <div style={{ padding: '40px' }}>
        <ContactTable
          onContactDelete={this.onContactDelete}
          onContactEdit={this.onContactEdit}
        />
      </div>
    );
  }
}

export default Contacts;
