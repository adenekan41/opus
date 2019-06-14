import React from 'react';
import Table from '../../../../components/Table';
import Avatar from '../../../../components/Avatar';
import TableActions from '../../../../components/Table/TableActions';


const assets_columns = data => {
  let {
    onAssetsEdit,
    onAssetsDelete,
    isLoading,
  } = data;
  return [

    {
      Header: 'Crop',
      accessor: 'crop',
      id: 'crop',
    },
    {
      Header: '',
      accessor: '',
      id: 'actions',
      Cell: ({ original }) => (
        <TableActions
          data={original}
          model="assets"
          isLoading={isLoading}
          onDelete={onAssetsDelete}
          editModalHeading="Edit Assets"
        />
      ),
    },
  ];
};

const AssetsTable = ({
  isAdmin,
  isLoading,
  pageSize,
  currentPage,
  totalPages,
  onClickRow,
  hasError,
  onRefresh,
  assets,
  onPageChange,
  onPageSizeChange,
  onFetchData,
  onAssetsEdit,
  onAssetstDelete,
}) => {
  return (
    <Table
      mt="50px"
      resized={[
        {
          id: 'crop',
          value: 120,
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
      showPagination={assets && assets.length > pageSize}
      totalPages={totalPages}
      onFetchData={onFetchData}
      data={assets}
      noDataText="No Assets Added Yet"
      errorText="Oops! There was an issue fetching your Assets"
      columns={assets_columns({
        onAssetsEdit,
        isLoading,
      })}
    />
  );
};

export default AssetsTable;
