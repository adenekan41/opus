import React from 'react';
import styled from 'styled-components';
import EmptyState, { ComingSoon } from '../../../components/EmptyState';


const StyledAssetSidebar = styled.div`

`;
class AllAssets extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }


  render() {
    // const { profile, contacts, crops } = this.props;
    // let { buttonLoading, cities } = this.state;
    // let isAdmin = profile.username === 'admin';
    // let formatCrops = crops.map(crop => ({
    //   label: crop.name,
    //   value: crop.name,
    // }));
    return (
    <StyledAssetSidebar>

        <div className="row">
            <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
             
            </div>
        </div>
      </StyledAssetSidebar>
    );
  }
}

export default AllAssets;
