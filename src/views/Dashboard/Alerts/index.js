import React from 'react';
import AlertTables from './components/alertTables';
import SearchInput from '../../../components/SearchInput';
class Alerts extends React.Component {
 
  render() {
     const defaultStyle = {
       background: '#29cb98',
      borderColor: '#29cb98',
      padding:"11px"
    }
    return (
      <div>
     
      <div style={{ padding: '40px' }}>
        <div className="row">
          <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
            <SearchInput placeholder="Search messages"/>
          </div>
          <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
            <button className="btn btn-success btn-block sucss_btn" style={defaultStyle}><i className="ion-ios-plus"></i>&nbsp;&nbsp;New Alert</button>
          </div>
        </div>
        <br />  <br /> 
        <AlertTables />
      </div>
   
      </div>
    );
  }
}

export default Alerts;
