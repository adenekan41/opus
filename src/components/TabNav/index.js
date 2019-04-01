import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon';
import { TabNavContainer, StyledTabItem, StyledTabList, StyledTabs, TabPanel } from './style';

const TabItem = ({
  onClick,
  children,
  isSelected,
  isFitted,
  spacing,
  className = '',
}) => (
  <StyledTabItem
    aria-selected={isSelected ? 'true' : 'false'}
    role="tab"
    isSelected={isSelected}
    spacing={spacing}
    tabIndex="0"
    onClick={onClick}
    onKeyDown={e => {
      if (e.keyCode === 13) {
        onClick();
      }
    }}
    isFitted={isFitted}
    className={`TabItem ${isSelected ? `TabItem--selected` : ''} ${className}`}
  >
    {children}
  </StyledTabItem>
);

let LinkTabItem = StyledTabItem.withComponent('a');
export const createStyledLink = c => StyledTabItem.withComponent(c);
export const TabItem2 = ({
  children,
  href,
  isSelected,
  className = '',
  LinkComponent = LinkTabItem,
}) => (
  <LinkComponent
    ariaSelected={isSelected ? 'true' : 'false'}
    role="tab"
    tabIndex="0"
    to={href}
    className={`TabItem ${isSelected ? `TabItem--selected` : ''} ${className}`}
  >
    {children}
  </LinkComponent>
);

export const TabList = ({
  tabs,
  onSelect,
  activeTab,
  isFitted,
  spacing,
  height,
  SingleTabItem = TabItem,
  showNavLine,
  css,
  fixed = true,
  showBorderBottom,
}) => {
  return (
    <StyledTabList
      role="tablist"
      className="TabList"
      fixed={fixed}
      showBorderBottom={showBorderBottom}
      {...{ height, showNavLine, css }}
    >
      {tabs.map((tab, index) => (
        <SingleTabItem
          spacing={spacing}
          isFitted={isFitted}
          key={tab.label}
          isSelected={activeTab === tab.label}
          onClick={() => onSelect(tab.label)}
          href={tab.url}
        >
          {tab.label}
        </SingleTabItem>
      ))}
    </StyledTabList>
  );
};

TabList.defaultProps = {
  isFitted: true,
  activeTab: 'Tab 2',
  height: '52px',
  showNavLine: true,
};


export class Tabs extends React.Component {
  state = {
    activeTab: this.props.defaultActiveTab,
  };
  componentDidUpdate(prevProps) {
    if (prevProps.defaultActiveTab !== this.props.defaultActiveTab) {
      this.setState({
        activeTab: this.props.defaultActiveTab,
      });
    }
  }
  onSelect = selectedTab => {
    this.setState({ activeTab: selectedTab }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(this.state.activeTab);
      }
    });
  };
  render() {
    const {
      tabs,
      isFitted,
      className,
      tabSpacing,
      children,
      showNavLine,
      TabListCSS,
      TabPanelCSS,
      SingleTabItem,
      fixed = true,
      showBorderBottom
    } = this.props;
    const { activeTab } = this.state;
    return (
      <StyledTabs className={`Tabs ${className}`}>
        <div className="TabListWrapper">
          <TabList
            fixed={fixed}
            {...{ tabs, isFitted, activeTab, showNavLine, SingleTabItem, showBorderBottom }}
            onSelect={this.onSelect}
            spacing={tabSpacing}
            css={TabListCSS}
          />
        </div>
        <TabPanel
          fixed={fixed}
          role="tabpanel"
          className="TabPanel"
          css={TabPanelCSS}
        >
          {children ? (
            children
          ) : (
            <React.Fragment>
              {tabs.filter(tab => tab.label === activeTab)[0].content}
            </React.Fragment>
          )}
        </TabPanel>
      </StyledTabs>
    );
  }
}

Tabs.defaultProps = {
  isFitted: true,
  defaultActiveTab: 'Tab 2',
  className: '',
};

const Anchor = styled.a;



export default function TabNav({ children, useNavLink, links }) {
  let Link = useNavLink ? NavLink : Anchor;
  return (
    <TabNavContainer>
      <div className="TabNav__navigation-section">
        <ul className="TabNav__navigation__tabs">
          {links.map((link, i) => (
            <li className="TabNav__navigation__tab" style={{flex: link.flex, maxWidth:link.max}} key={i.toString()}>
              <Link to={link.url} href={link.url} activeClassName="active" exact>
                <Icon name={link.icon} /> <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="TabNav__content-section">{children}</div>
    </TabNavContainer>
  );
}
