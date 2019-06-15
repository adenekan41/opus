import React from 'react';
import AssetsTable from './components/AssetsTable';
import SearchInput from '../../../components/SearchInput';
import { Icon } from '../../../components/Icon';
import EmptyState, { ComingSoon } from '../../../components/EmptyState';
import emptyStateImage from '../../../assets/img/empty-states/contacts.png';
import Button from '../../../components/Button';
class Assets extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonLoading: false,
    };
  }


  render() {
    const { profile , assets } = this.props;
    let { buttonLoading, cities } = this.state;
    let isAdmin = profile.username === 'admin';
    return (
      <div style={{ padding: '4rem' }}>
        <div className="row">
           <div className="col-md-3 col-sm-3 col-lg-3 col-12">
            
           </div>
            <div className="col-md-9 col-sm-9 col-lg-9 col-12">
               <div className="row">
                    <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
                        <SearchInput placeholder="Search Assets" mb="8px" />
                    </div>
                    <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
                    <Button kind="green" block>
                        <Icon name="add" color="#ffffff" />
                        &nbsp;&nbsp;Add Crop
                    </Button>
                    </div>
                    
                    <div className="col-md-12">
                    <AssetsTable
                    
                    isAdmin={isAdmin}
                    assets={assets}
                    isLoading={buttonLoading}
                    onContactEdit={this.onContactEdit}
                    onContactDelete={this.onContactDelete}
                    />
                    </div>
               </div>
              
           </div>
          </div>
      </div>
    );
  }
}

export default Assets;
