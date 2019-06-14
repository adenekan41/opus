import React from "react";
import Media from "react-media";
import { SidebarContainer, StyledCombinedSidebar } from "./style";
import { CompanyMenu, MenuLink } from "./components";
import { ToggleHandler } from "../../helpers/ToggleHandler";
import Logo from "../Logo";

const getUserRole = user => {
  if (user.is_admin) {
    return "admin";
  }
  if (user.is_customer) {
    return "customer";
  }
  if (user.is_employee) {
    return "employee";
  }
};

export class Sidebar extends React.Component {
  render() {
    const {
      menus,
      isCollapsed,
      useNavlink,
      history,
      user = {
        first_name: "John",
        last_name: "Doe",
        role: "Customer",
      },
    } = this.props;
    return (
      <SidebarContainer
        className="Sidebar"
        role="navigation"
        isCollapsed={isCollapsed}
      >
        <div className="Sidebar__Content">
          <div className="Sidebar__Logo">
            {isCollapsed ? (
              <Logo width="200px" height="40px" type="" icon />
            ) : (
              <Logo width="200px" height="40px" />
            )}
          </div>
          <div className="Sidebar__Header">
            <CompanyMenu
              role={getUserRole(user)}
              photo={
                user.profile_picture
                  ? `${process.env.REACT_APP_API_URL}${user.profile_picture}`
                  : ""
              }
              customerName={`${user.first_name} ${user.last_name}`}
              theme="dark"
              history={history}
              isCollapsed={isCollapsed}
            />
          </div>

          <div className="Sidebar__Main">
            {menus.map(menu => {
              return (
                <MenuLink
                  key={menu.label}
                  url={menu.url}
                  icon={menu.icon}
                  isCollapsed={isCollapsed}
                  Navlink={useNavlink}
                  title={menu.label}
                >
                  {menu.label}
                </MenuLink>
              );
            })}
          </div>
          <div className="Sidebar__Footer">{this.props.render()}</div>
        </div>
      </SidebarContainer>
    );
  }
}

Sidebar.defaultProps = {
  showGetStarted: true,
  menus: [
    {
      icon: "weather",
      label: "Weather Data",
      url: "/dashboard/weather-data/map",
    },
    { icon: "user", label: "Contacts", url: "/dashboard/contacts" },
    { icon: "send", label: "Alerts", url: "/dashboard/alerts" },
    // { icon: 'customers', label: 'Customers', url: '/dashboard/customers' },
    { icon: "team", label: "Users", url: "/dashboard/users" },
    { icon: "chart", label: "Assets", url: "/dashboard/assets" },
    { icon: "chart", label: "Compare", url: "/dashboard/compare" },
  ],
};

class CombinedSidebar extends React.Component {
  render() {
    const { user, history, useNavlink, isCollapsed, openSideBar } = this.props;
    return (
      <StyledCombinedSidebar>
        <Media query="(max-width: 1024px)">
          {matches => {
            return (
              <ToggleHandler>
                {({ isOpen, onToggle }) => (
                  <React.Fragment>
                    <Sidebar
                      {...{ user, useNavlink, history }}
                      isCollapsed={matches ? isCollapsed : !isOpen}
                      render={() => (
                        <MenuLink
                          icon={
                            !isOpen ? "framed-right-arrow" : "framed-left-arrow"
                          }
                          onClick={matches ? openSideBar : onToggle}
                          className="Sidebar__toggle-button"
                          isCollapsed={!isOpen}
                        >
                          {!matches ? `Hide Sidebar` : ``}
                        </MenuLink>
                      )}
                    />
                  </React.Fragment>
                )}
              </ToggleHandler>
            );
          }}
        </Media>
      </StyledCombinedSidebar>
    );
  }
}

export default CombinedSidebar;
