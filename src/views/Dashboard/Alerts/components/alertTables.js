 import React from 'react';
import Table from '../../../../components/Table';
import Avatar from '../../../../components/Avatar';
import TableActions from '../../../../components/Table/TableActions';



const Alert = ({
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
 }) => {
  return (
    <Table
      mt="50px"
    
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
      noDataText="No Alert Yet"
      errorText="Oops! There was an issue fetching your alerts"
     
    />
  );
};

export default Alert;

Alert.defaultProps = {
  alerts: [
    {
      title: 'Storm Alert',
      type: 'SMS',
      to: 'Maureen Motumbo',
      message: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for.',
      date: '01:31am   -   Jan 12, 2019',
    },
     {
      title: 'Storm Alert',
      type: 'SMS',
      to: 'Maureen Motumbo',
      message: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for.',
      date: '01:31am   -   Jan 12, 2019',
    },
     {
      title: 'Storm Alert',
      type: 'SMS',
      to: 'Maureen Motumbo',
      message: 'The monkey-rope is found in all whalers; but it was only in the Pequod that the monkey and his holder were ever tied together. This improvement upon the original usage was introduced by no less a man than Stubb, in order to afford the imperilled harpooneer the strongest possible guarantee for.',
      date: '01:31am   -   Jan 12, 2019',
    },
   
  ],
};
