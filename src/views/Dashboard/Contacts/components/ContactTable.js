import React from 'react';
import Table from '../../../../components/Table';
import Avatar from '../../../../components/Avatar';
import TableActions from '../../../../components/Table/TableActions';
import ContactForm from './ContactForm';

const contact_columns = data => {
  let {
    onContactEdit,
    onContactDelete,
    isLoading,
    crops,
    countries,
    cities,
    isAdmin,
    getCountryCities,
  } = data;
  return [
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
        <span>
          {original.city}, {original.country}
        </span>
      ),
    },
    {
      Header: 'Crop',
      accessor: 'crop_managed',
      id: 'crop_managed',
    },
    {
      Header: 'Phone',
      id: 'phone_number',
      Cell: ({ original }) => <span>{original.phone_numbers[0]}</span>,
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
          isLoading={isLoading}
          onDelete={onContactDelete}
          editModalHeading="Edit Contact"
          renderEditForm={({ closeModal }) => (
            <ContactForm
              {...original}
              crops={crops}
              cities={cities}
              onSubmit={onContactEdit}
              isAdmin={isAdmin}
              countries={countries}
              onCancel={closeModal}
              isLoading={isLoading}
              getCountryCities={getCountryCities}
            />
          )}
        />
      ),
    },
  ];
};

const ContactTable = ({
  crops,
  countries,
  cities,
  isAdmin,
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
  getCountryCities
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
          id: 'middle_name',
          value: 120,
        },
        {
          id: 'location',
          value: 150,
        },
        {
          id: 'language',
          value: 100,
        },
        {
          id: 'phone_number',
          value: 150,
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
      columns={contact_columns({
        onContactEdit,
        onContactDelete,
        getCountryCities,
        isLoading,
        crops,
        countries,
        cities,
        isAdmin,
      })}
    />
  );
};

export default ContactTable;