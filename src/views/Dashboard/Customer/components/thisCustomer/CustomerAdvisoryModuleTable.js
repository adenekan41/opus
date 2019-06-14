import React from 'react';
import Table from '../../../../../components/Table';
import TableActions from '../../../../../components/Table/TableActions';


const advisorymodules_columns = data => {
  let {
    onCustomerEdit,
    onCustomerDelete,
    isLoading,
    isAdmin,
  } = data;
  return [
    {
      Header: '',
      accessor: '',
      id: 'remove',
      Cell: ({ original: { } }) => {
        return (
         <i className="ion-ios-trash-outline"></i>
        );
      },
    },
    {
      Header: 'Advisory Module',
      accessor: 'name',
      id: 'name',
    },
    {
      Header: '',
      accessor: '',
      id: 'actions',
      Cell: ({ original }) => (
        <TableActions
          data={original}
          model="advisorymodules"
          isLoading={isLoading}
          onDelete={onCustomerDelete}
          editModalHeading="Edit Customer Modules"
         
        />
      ),
    },
  ];
};

const CustomerAdvisoryModuleTable = ({
  isAdmin,
  isLoading,
  pageSize,
  currentPage,
  totalPages,
  onClickRow,
  hasError,
  onRefresh,
  advisorymodules,
  onPageChange,
  onPageSizeChange,
  onFetchData,
  onCustomerEdit,
  onCustomerDelete,
}) => {
  return (
    <Table
      mt="50px"
      resized={[
        {
          id: 'remove',
          value: 30,
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
      showPagination={advisorymodules && advisorymodules.length > pageSize}
      totalPages={totalPages}
      onFetchData={onFetchData}
      data={advisorymodules}
      noDataText="No Modules Added Yet"
      errorText="Oops! There was an issue fetching your Modules"
      columns={advisorymodules_columns({
        onCustomerEdit,
        onCustomerDelete,
        isLoading,
        isAdmin,
      })}
    />
  );
};

export default CustomerAdvisoryModuleTable;
