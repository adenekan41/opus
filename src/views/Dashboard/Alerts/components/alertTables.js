 import React from 'react';
import Alerts from '../../../../components/Alert';
import Avatar from '../../../../components/Avatar';
import TableActions from '../../../../components/Table/TableActions';


const AlertStyle = {
  borderRadius: '3px',
  boxShadow: '0 10px 14px -4px rgba(70, 70, 70, 0.06)',
  backgroundColor: '#ffffff',
  padding:'20px',
  border: 'none',
  height: '44px',
  width: '144px',
}
const Alerttable = ({
  isLoading,
  pageSize,
  currentPage,
  totalPages,
  onClickRow,
  hasError,
  onRefresh,
  alerts,
  onPageChange,
  onPageSizeChange,
  onFetchData,
 }) => {
  return (
  	<React.Fragment>
  	<div>
  		<p>
	  		<select style={AlertStyle}>
	  			<option>All messages</option>
	  			<option>All messages</option>
	  			<option>All messages</option>
	  		</select>
	  		<b style={{float:'right' ,color: '#242424', fontWeight:'100'}}>Showing {alerts.length} of {alerts.length}</b>
  		</p>
  	</div>
  	<hr/>
    <Alerts
      mt="50px"
    
      onClickRow={onClickRow}
      isLoading={isLoading}
      hasError={hasError}
      onRefresh={onRefresh}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      pageSize={pageSize}
      currentPage={currentPage}
      showPagination={alerts && alerts.length > pageSize}
      totalPages={totalPages}
      onFetchData={onFetchData}
      data={alerts}
      noDataText="No Alert Yet"
      errorText="Oops! There was an issue fetching your alerts"
     
    />
    </React.Fragment>
  );
};

export default Alerttable;

Alerttable.defaultProps = {
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
