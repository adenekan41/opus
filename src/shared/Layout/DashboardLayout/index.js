import React from 'react';
import { StyledDashboardLayout } from './style';
import CombinedSidebar from '../../../components/Sidebar';

const getUserMenu = (profile) => {
  if(profile.is_superuser) {
    return [
      {
        icon: 'boxes',
        label: 'Dashboard',
        url: '/dashboard/stats',
      },
      {
        icon: "weather",
        label: "Weather Data",
        url: "/dashboard/weather-data/map",
      },
      { icon: "send", label: "Alerts", url: "/dashboard/alerts" },
      { icon: 'customers', label: 'Customers', url: '/dashboard/customers' },
      { icon: "contacts", label: "Contacts", url: "/dashboard/contacts" },
      { icon: "team", label: "Users", url: "/dashboard/users" },
      { icon: "chart", label: "Assets", url: "/dashboard/assets" },
      { icon: "chart", label: "Compare", url: "/dashboard/compare" },
    ]
  }
  if(profile.is_admin) {
    return [
      {
        icon: 'boxes',
        label: 'Dashboard',
        url: '/dashboard/stats',
      },
      {
        icon: "weather",
        label: "Weather Data",
        url: "/dashboard/weather-data/map",
      },
      { icon: "send", label: "Alerts", url: "/dashboard/alerts" },
      { icon: 'customers', label: 'Customers', url: '/dashboard/customers' },
      { icon: "contacts", label: "Contacts", url: "/dashboard/contacts" },
      { icon: "chart", label: "Assets", url: "/dashboard/assets" },
      { icon: "chart", label: "Compare", url: "/dashboard/compare" },
    ]
  }
  if(profile.is_customer) {
    return [
      {
        icon: 'boxes',
        label: 'Dashboard',
        url: '/dashboard/stats',
      },
      {
        icon: "weather",
        label: "Weather Data",
        url: "/dashboard/weather-data/map",
      },
      { icon: "send", label: "Alerts", url: "/dashboard/alerts" },
      { icon: "contacts", label: "Contacts", url: "/dashboard/contacts" },
      { icon: "chart", label: "Compare", url: "/dashboard/compare" },
    ]
  }
}

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
          menus={getUserMenu(profile)}
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
