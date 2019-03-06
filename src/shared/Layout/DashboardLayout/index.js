import React from 'react';
import { StyledDashboardLayout } from './style';
import CombinedSidebar from '../../../components/Sidebar';

class DashboardLayout extends React.Component {
  state = {
    showSidebar: false,
  };

  openSideBar = () => {
    this.setState(({ showSidebar }) => ({
      showSidebar: !showSidebar,
    }));
  };

  render() {
    const { showSidebar } = this.state;
    const { history, showGetStarted, profile } = this.props;

    return (
      <StyledDashboardLayout {...{ showSidebar }}>
        <CombinedSidebar
          useNavlink={Boolean(this.props.NavLink)}
          showGetStarted={showGetStarted}
          openSideBar={this.openSideBar}
          isCollapsed={!showSidebar}
          history={history}
          user={profile}
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
