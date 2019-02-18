import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Text, Flex } from 'rebass';
import Avatar from '../Avatar';
import { Icon } from '../Icon';
import Tooltip from '../Tooltip';
import Button from '../Button';

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: 100%;

  .Text {
    line-height: 1;
    text-align: center;
  }

  .customer-name {
    opacity: 0.6;
  }
`;
export class CompanyMenu extends React.Component {
  state = { showDropdown: true };
  render() {
    const {
      onClick,
      isCollapsed,
      role,
      history,
      customerName = 'Segun Adebayo',
    } = this.props;
    const initials = customerName
      .split(' ')
      .map(item => item[0])
      .join('');
    return (
      <StyledDropdown onClick={onClick}>
        <Avatar
          initial={initials}
          size={isCollapsed ? '40px' : '80px'}
          bgColor="#ff9901"
          isRound
        />
        <Flex flexDirection="column" alignItems="center" mt="16px" width="100%">
          <Text
            fontWeight="bold"
            fontSize="18px"
            color="#242424"
            className="Text"
          >
            {isCollapsed ? initials : customerName}
          </Text>
          {!isCollapsed && (
            <Text
              className="Text customer-name"
              color="#b4b4b4"
              size="tiny"
              mt="8px"
            >
              {role}
            </Text>
          )}
          <Button size="small" mt="16px" px={isCollapsed ? `4px` : `32px`} width="100%">
            {isCollapsed ? `Profile` : `View Profile`}
          </Button>
        </Flex>
      </StyledDropdown>
    );
  }
}

const MenuLinkContainer = styled.li`
  list-style-type: none;
  position: relative;

  .Tooltip {
    opacity: 0;
    visibility: hidden;
    transition: 0.2s opacity;
  }

  &:hover {
    .Tooltip {
      opacity: 1;
      visibility: visible;
    }
  }

  a {
    color: #b4b4b4;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 12px 24px;
    text-decoration: none;

    &:hover {
      background: #f2f2f2;
      text-decoration: none;
    }

    &:focus {
      outline: 0;
      background: #f2f2f2;
      text-decoration: none;
    }

    &.MenuLink--active {
      border-left: 2px solid #ff9901;
      text-decoration: none;

      .Icon {
        color: #000000;
      }

      .Text {
        font-weight: 500;
        color: #000000;
      }
    }
  }
`;

export const MenuLink = ({
  icon,
  iconSize = '14px',
  children,
  Navlink = false,
  url,
  title,
  isActive,
  isCollapsed,
  ...rest
}) => {
  const Menu = ({ icon, iconSize, children }) => (
    <React.Fragment>
      <Flex
        className="icon-container"
        width="32px"
        alignItems="center"
        justifyContent="center"
      >
        <Icon name={icon} color="#b4b4b4" size={iconSize} />
      </Flex>
      {!isCollapsed && (
        <Text ml="12px" color="#b4b4b4" size="small">
          {children}
        </Text>
      )}
    </React.Fragment>
  );
  return (
    <MenuLinkContainer isCollapsed={isCollapsed} className="MenuLink" {...rest}>
      {isCollapsed && title && <Tooltip>{title}</Tooltip>}
      {Navlink ? (
        <NavLink to={url} activeClassName="MenuLink--active">
          <Menu {...{ icon, iconSize }}>{children}</Menu>
        </NavLink>
      ) : (
        <a href={url} className={isActive ? 'MenuLink--active' : ''}>
          <Menu {...{ icon, iconSize }}>{children}</Menu>
        </a>
      )}
    </MenuLinkContainer>
  );
};
