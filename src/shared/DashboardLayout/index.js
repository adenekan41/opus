import React from 'react';
import { StyledDashboardLayout } from './style';
import CombinedSidebar from '../../components/Sidebar';

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
    const { showSidebar, showDetailView } = this.state;
    const {
      agentInfo = {},
      resumeData = {},
      resume_fetched,
      currentPage,
      updateState,
      history,
      showGetStarted,
      actions,
      bannerShowing,
    } = this.props;

    return (
      <StyledDashboardLayout {...{ showSidebar }}>
        <CombinedSidebar
          useNavlink={Boolean(this.props.NavLink)}
          showGetStarted={showGetStarted}
          agentInfo={agentInfo}
          isCollapsed={!showSidebar}
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
