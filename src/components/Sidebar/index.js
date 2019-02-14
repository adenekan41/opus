import React from 'react';
import Media from 'react-media';
import { SidebarContainer, StyledCombinedSidebar } from './style';
import { CompanyMenu, MenuLink } from './components';
import { ToggleHandler } from '../../helpers/ToggleHandler';

export class Sidebar extends React.Component {
  render() {
    const {
      menus,
      activePage,
      isCollapsed,
      useNavlink,
      showGetStarted,
      agentInfo = {
        first_name: 'John',
        last_name: 'Doe',
        company_name: 'Career Palace',
        email: 'johndoe@gmail.com',
      },
    } = this.props;
    return (
      <SidebarContainer
        className="Sidebar"
        role="navigation"
        isCollapsed={isCollapsed}
      >
        <div className="Sidebar__Content">
          <div className="Sidebar__Header">
            <CompanyMenu
              companyName={agentInfo.company_name}
              customerName={`${agentInfo.first_name} ${agentInfo.last_name}`}
              theme="dark"
              isCollapsed={isCollapsed}
            />
          </div>

          <div className="Sidebar__Main">
            {showGetStarted && (
              <MenuLink
                url="/get-started"
                icon="globe"
                isCollapsed={isCollapsed}
                isActive={activePage === 'Dashboard'}
                Navlink={useNavlink}
                title="Get Started"
              >
                Get Started
              </MenuLink>
            )}

            <MenuLink
              url="/account-dashboard"
              icon="home"
              isCollapsed={isCollapsed}
              isActive={activePage === 'Dashboard'}
              Navlink={useNavlink}
              title="Home"
            >
              Home
            </MenuLink>
            {menus.map((menu, i) => (
              <MenuLink
                key={menu.label}
                url={menu.url}
                icon={menu.icon}
                isCollapsed={isCollapsed}
                isActive={activePage === 'Dashboard'}
                Navlink={useNavlink}
                title={menu.label}
              >
                {menu.label}
              </MenuLink>
            ))}
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
    { icon: 'user', label: 'Customers', url: '/customers', badge: 2 },
    { icon: 'doc', label: 'Resumes', url: '/resumes' },
    { icon: 'settings', label: 'Settings', url: '/settings' },
    { icon: 'help', label: 'Support', url: '/support' },
  ],
};

class CombinedSidebar extends React.Component {
  render() {
    const {
      agentInfo,
      showGetStarted,
      useNavlink,
      resumeData,
      isCollapsed,
    } = this.props;
    return (
      <StyledCombinedSidebar>
        <Media query="(max-width: 1024px)">
          {matches => {
            return (
              <ToggleHandler>
                {(isOpen, onOpen, onClose, onToggle) => (
                  <React.Fragment>
                    <Sidebar
                      {...{ agentInfo, useNavlink, resumeData, showGetStarted }}
                      isCollapsed={matches ? isCollapsed : !isOpen}
                      render={() => (
                        <MenuLink
                          icon={
                            !isOpen ? 'framed-right-arrow' : 'framed-left-arrow'
                          }
                          onClick={onToggle}
                          className="Sidebar__toggle-button"
                          isCollapsed={!isOpen}
                        >
                          Hide Sidebar
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
