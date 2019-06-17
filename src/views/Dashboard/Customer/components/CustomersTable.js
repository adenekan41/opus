import React from 'react';
import Table from '../../../../components/Table';
import Avatar from '../../../../components/Avatar';
import TableActions from '../../../../components/Table/TableActions';
import CustomerForm from './CustomerForm';

const customers_columns = data => {
  let {
    onCustomerEdit,
    onCustomerDelete,
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
      id: 'customer_initals',
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
      Header: 'Phone',
      id: 'phone_number',
      Cell: ({ original }) => <span>{original.phone_numbers}</span>,
    },
    {
      Header: 'Company',
      accessor: 'company',
      id: 'company',
    },
    {
      Header: '',
      accessor: '',
      id: 'actions',
      Cell: ({ original }) => (
        <TableActions
          data={original}
          model="customer"
          isLoading={isLoading}
          onDelete={onCustomerDelete}
          editModalHeading="Edit Customer"
          renderEditForm={({ closeModal }) => (
            <CustomerForm
              {...original}
              crops={crops}
              cities={cities}
              onSubmit={onCustomerEdit}
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
    {
        Header: 'Location',
        id: 'location',
        Cell: ({ original }) => (
          <span>
            {original.city}, {original.country}
          </span>
        ),
      },
  ];
};

const CustomerTable = ({
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
  customers,
  onPageChange,
  onPageSizeChange,
  onFetchData,
  onCustomerEdit,
  onCustomerDelete,
  getCountryCities,
}) => {
  return (
    <Table
      mt="50px"
      resized={[
        {
          id: 'contact_initals',
          value: 30,
        },
        {
          id: 'middle_name',
          value: 130,
        },
        {
          id: 'location',
          value: 200,
        },
        {
          id: 'company',
          value: 120,
        },
        {
          id: 'phone_number',
          value: 250,
        },
        {
          id: 'actions',
          value: 100,
        },
      ]}
      onClickRow={onClickRow}
      hasError={hasError}
      onRefresh={onRefresh}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      pageSize={pageSize}
      currentPage={currentPage}
      showPagination={customers && customers.length > pageSize}
      totalPages={totalPages}
      onFetchData={onFetchData}
      data={customers}
      noDataText="No Customers Added Yet"
      errorText="Oops! There was an issue fetching your customers"
      columns={customers_columns({
        onCustomerEdit,
        onCustomerDelete,
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

export default CustomerTable;
