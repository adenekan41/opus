import React from 'react';
import Table from '../../../../components/Table';
import Avatar from '../../../../components/Avatar';
import TableActions from '../../../../components/Table/TableActions';

const contact_columns = data => {
  let {
    onContactEdit,
    onContactDelete,
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
      Cell: ({ original }) => (
        <span>
          {original.first_name || "-"}
        </span>
      ),
      id: 'first_name',
    },
    {
      Header: 'Middle Name',
      Cell: ({ original }) => (
        <span>
          {original.middle_name || "-"}
        </span>
      ),
      id: 'middle_name',
    },
    {
      Header: 'Last Name',
      Cell: ({ original }) => (
        <span>
          {original.last_name || "-"}
        </span>
      ),
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
      Cell: ({ original }) => (
        <span>
          {original.customer || "-"}
        </span>
      ),
      id: 'customer',
    },
    {
      Header: 'Language',
      Cell: ({ original }) => (
        <span>
          {original.language || "-"}
        </span>
      ),
      id: 'language',
    },
    {
      Header: '',
      accessor: '',
      id: 'actions',
      Cell: ({ original }) => (
        <TableActions
          model="contact"
          placement="bottom"
          onDelete={() => onContactDelete(original)}
          onEdit={() => onContactEdit(original)}
        />
      ),
    },
  ];
};

const ContactTable = ({
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
      })}
    />
  );
};

export default ContactTable;
