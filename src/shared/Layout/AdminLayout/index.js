import React from 'react';
import { StyledDashboardLayout } from './style';
import CombinedSidebar from '../../../components/Sidebar/admin';

class DashboardLayout extends React.Component {
  state = {
    showSidebar: false,
    showDetailView: false,
  };

  openSideBar = () => {
    this.setState(({ showSidebar, isCollapsed }) => ({
      showSidebar: !showSidebar,
    }));
  };

  render() {
    const { showSidebar } = this.state;
    const {
      agentInfo = {},
      history,
      showGetStarted,
    } = this.props;

    return (
      <StyledDashboardLayout {...{ showSidebar }}>
        <CombinedSidebar
          useNavlink={Boolean(this.props.NavLink)}
          showGetStarted={showGetStarted}
          agentInfo={agentInfo}
          isCollapsed={!showSidebar}
          history={history}
        />
        <div
          className={`Page__Content ${
            this.state.showSidebar ? 'Sidebar--active' : ''
          }`}
        >
          {this.props.children}
        </div>
      </StyledDashboardLayout>
    );
  }
}

export default DashboardLayout;
