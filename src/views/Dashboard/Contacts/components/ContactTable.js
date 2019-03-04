import React from 'react';
import Table from '../../../../components/Table';
import Avatar from '../../../../components/Avatar';
import TableActions from '../../../../components/Table/TableActions';
import ContactForm from './ContactForm';

const contact_columns = (onContactEdit, onContactDelete, isLoading) => [
  {
    Header: '',
    accessor: '',
    id: 'contact_initals',
    Cell: ({ original: { first_name, last_name } }) => {
      return (
        <Avatar
          isRound
          size="38px"
          photo_url=""
          color="#ff9901"
          bgColor="rgba(255,153,1,.15)"
          initial={`${first_name[0]}${last_name[0]}`}
        />
      );
    },
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
    id: 'first_name',
  },
  {
    Header: 'Middle Name',
    accessor: 'middle_name',
    id: 'middle_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
    id: 'last_name',
  },
  {
    Header: 'Location',
    id: 'location',
    Cell: ({ original }) => (
      <span>{original.city}, {original.country}</span>
    ),
  },
  {
    Header: 'Crop',
    accessor: 'crop',
    id: 'crop',
  },
  {
    Header: 'Phone',
    accessor: 'phone_number',
    id: 'phone_number',
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
        isLoading={isLoading}
        onEdit={onContactEdit}
        onDelete={onContactDelete}
        editModalHeading="Edit Contact"
        renderEditForm={({ data, onEdit, closeModal }) => (
          <ContactForm
            {...data}
            onSubmit={onEdit}
            onCancel={closeModal}
            isLoading={isLoading}
          />
        )}
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
      columns={contact_columns(onContactEdit, onContactDelete, isLoading)}
    />
  );
};

export default ContactTable;

ContactTable.defaultProps = {
  contacts: [
    {
      first_name: 'Jessica',
      middle_name: 'Amanda',
      last_name: 'Jones',
      crop: 'Cashew',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      phone_number: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
    },
     {
      first_name: 'Jessica',
      middle_name: 'Amanda',
      last_name: 'Jones',
      crop: 'Cashew',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      phone_number: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
    },
     {
      first_name: 'Jessica',
      middle_name: 'Amanda',
      last_name: 'Jones',
      crop: 'Cashew',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      phone_number: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
    },
     {
      first_name: 'Jessica',
      middle_name: 'Amanda',
      last_name: 'Jones',
      crop: 'Cashew',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      phone_number: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
    },
     {
      first_name: 'Jessica',
      middle_name: 'Amanda',
      last_name: 'Jones',
      crop: 'Cashew',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      phone_number: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
    },
     {
      first_name: 'Jessica',
      middle_name: 'Amanda',
      last_name: 'Jones',
      crop: 'Cashew',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      phone_number: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
    },
     {
      first_name: 'Jessica',
      middle_name: 'Amanda',
      last_name: 'Jones',
      crop: 'Cashew',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      phone_number: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
    },
     {
      first_name: 'Jessica',
      middle_name: 'Amanda',
      last_name: 'Jones',
      crop: 'Cashew',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      phone_number: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
    },
    {
      first_name: 'Jessica',
      middle_name: 'Amanda',
      last_name: 'Jones',
      crop: 'Cashew',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      phone_number: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
    },
    {
      first_name: 'Jessica',
      middle_name: 'Amanda',
      last_name: 'Jones',
      crop: 'Cashew',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      phone_number: '0912345672',
      customer: 'Daniel Wass',
      language: 'English',
    },
  ],
};
