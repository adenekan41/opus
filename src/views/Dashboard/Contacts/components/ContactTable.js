import React from 'react';
import Table from '../../../../components/Table';
import Avatar from '../../../../components/Avatar';
import TableActions from '../../../../components/Table/TableActions';

const contact_columns = (onContactEdit, onContactDelete) => [
  {
    Header: '',
    accessor: '',
    id: 'contact_initals',
    Cell: ({ original: { firstName, lastName } }) => {
      return (
        <Avatar
          isRound
          size="38px"
          photo_url=""
          color="#ff9901"
          bgColor="rgba(255,153,1,.15)"
          initial={`${firstName[0]}${lastName[0]}`}
        />
      );
    },
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
    id: 'firstName',
  },
  {
    Header: 'Middle Name',
    accessor: 'middleName',
    id: 'middleName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    id: 'lastName',
  },
  {
    Header: 'Location',
    accessor: 'location',
    id: 'location',
  },
  {
    Header: 'Crop',
    accessor: 'crop',
    id: 'crop',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    id: 'phone',
  },
  {
    Header: 'Customer',
    accessor: 'customer',
    id: 'customer',
  },
  {
    Header: 'Language',
    accessor: 'language',
    id: 'language',
  },
  {
    Header: '',
    accessor: '',
    id: 'actions',
    Cell: ({ original }) => (
      <TableActions
        model="contact"
        data={original}
        onEdit={onContactEdit}
        onDelete={onContactDelete}
      />
    ),
  },
];

const ContactTable = ({
  isLoading,
  pageSize,
  currentPage,
  totalPages,
  onClickRow,
  hasError,
  onRefresh,
  contacts,
  onPageChange,
  onPageSizeChange,
  onFetchData,
  onContactEdit,
  onContactDelete,
}) => {
  return (
    <Table
      mt="50px"
      resized={[
        {
          id: 'contact_initals',
          value: 80,
        },
        {
          id: 'location',
          value: 200,
        },
        {
          id: 'language',
          value: 100,
        },
        {
          id: 'actions',
          value: 80,
        },
      ]}
      onClickRow={onClickRow}
      isLoading={isLoading}
      hasError={hasError}
      onRefresh={onRefresh}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      pageSize={pageSize}
      currentPage={currentPage}
      showPagination={contacts && contacts.length > pageSize}
      totalPages={totalPages}
      onFetchData={onFetchData}
      data={contacts}
      noDataText="No Contacts Added Yet"
      errorText="Oops! There was an issue fetching your contacts"
      columns={contact_columns(onContactEdit, onContactDelete)}
    />
  );
};

export default ContactTable;

ContactTable.defaultProps = {
  contacts: [
    {
      firstName: 'Jessica',
      middleName: 'Amanda',
      lastName: 'Jones',
      crop: 'Cashew',
      location: 'Addis Ababa, Ethiopia',
      phone: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
      photo_url:
        'https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1',
    },
    {
      firstName: 'Jessica',
      middleName: 'Amanda',
      lastName: 'Jones',
      crop: 'Cashew',
      location: 'Addis Ababa, Ethiopia',
      phone: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
      photo_url:
        'https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1',
    },
    {
      firstName: 'Jessica',
      middleName: 'Amanda',
      lastName: 'Jones',
      crop: 'Cashew',
      location: 'Addis Ababa, Ethiopia',
      phone: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
      photo_url:
        'https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1',
    },
  ],
};
