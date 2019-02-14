import React from 'react';
import styled from 'styled-components';
import { Text, Flex, Box } from 'rebass';
import Avatar from '../Avatar';
import { Icon } from '../Icon';
import Tooltip from '../Tooltip';

const StyledDropdown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  .Text {
    line-height: 1;
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
      theme,
      companyName = 'Careers Pro',
      customerName = 'Segun Adebayo',
    } = this.props;
    const companyInitials = companyName
      .split(' ')
      .map(item => item[0])
      .join('');
    return (
      <StyledDropdown onClick={onClick}>
        <Avatar
          initial={companyInitials}
          bgColor={"00B5D8"}
          size="32px"
        />
        {!isCollapsed && (
          <Box ml="12px">
            <Text
              width="160px"
              fontWeight="medium"
              color={theme === 'dark' ? 'white' : '#273444'}
              className="Text"
            >
              {companyName}
            </Text>
            <Text
              className="customer-name"
              color={theme === 'dark' ? 'white' : '#273444'}
              size="tiny"
              mt="4px"
            >
              {customerName}
            </Text>
          </Box>
        )}
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
    text-decoration:none;

    &:hover {
      background: #f2f2f2;
    }

    &:focus {
      outline: 0;
      background: #f2f2f2;
    }

    &.MenuLink--active {
      border-left: 2px solid #ff9901;
      background-color: rgba(0, 0, 0, 0.2);

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
