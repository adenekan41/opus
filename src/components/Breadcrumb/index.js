import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from 'rebass';

const BreadcrumbItemContainer = styled.div`
  a {
    text-decoration: none;
    color: ${props => (props.isActive ? '#ffffff' : '#b4b4b4')}!important;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 120px;
    height: 40px;
    position: relative;
    background: ${props => (props.isActive ? '#29cb98' : '#ffffff')};
    z-index: ${props => (!props.isActive ? 4 : 0)};
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
    font-size: 14px;
    &:before {
      content: '';
      position: absolute;
      right: -20px;
      bottom: 0;
      width: 0;
      height: 0;
      border-left: 20px solid
        ${props => (props.isActive ? '#29cb98' : '#ffffff')};
      border-top: 20px solid transparent;
      border-bottom: 20px solid transparent;
    }
    &:hover {
      text-decoration: none;
    }
    span {
      ${props =>
        props.isActive
          ? `
        position: relative;
        left: 12px;`
          : ``}
    }
  }
`;

export const BreadcrumbItem = ({ useNavlink, isActive, url, children }) => (
  <BreadcrumbItemContainer isActive={isActive}>
    {url ? (
      useNavlink ? (
        <NavLink to={url}>
          <span>{children}</span>
        </NavLink>
      ) : (
        <a href={url}>
          <span>{children}</span>
        </a>
      )
    ) : (
      <a>
        <span>{children}</span>
      </a>
    )}
  </BreadcrumbItemContainer>
);

export default class Breadcrumbs extends Component {
  static BreadcrumbItem = BreadcrumbItem;
  render() {
    return (
      <Flex>
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child);
        })}
      </Flex>
    );
  }
}
