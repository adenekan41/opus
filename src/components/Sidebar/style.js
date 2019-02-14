import React from 'react';
import styled, { css } from 'styled-components';

export const SidebarContainer = styled.div`
  width: ${props => (props.isCollapsed ? '64px' : '264px')};
  height: 100vh;
  position: relative;
  transition: all 0.3s;
  z-index: 51;
  left: 0;
  top: 0;
  background: #fafafa;

  .Sidebar {
    &__Content {
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    &__Header {
      height: 64px;
      flex-grow: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 24px;
      padding: 0 24px;
      transition: all 0.3s;

      ${props =>
        props.isCollapsed &&
        css`
          padding: 0;
          justify-content: center;
        `}

      &:hover {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.1);
      }

      .Logo {
        transform: translateX(-12px);
      }
    }

    &__Main {
      flex: 1;

      .MenuGroup {
        &__Heading {
          font-weight: 500;
          font-size: 12px;
          color: #62798f;
          display: block;
          padding: 12px 24px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 16px 0 2px;
        }
      }
    }

    &__Footer {
      position: relative;
      padding: 0 24px 40px;
      border-top: 1px solid #e8e8e8;
      ${props =>
        props.isCollapsed &&
        css`
          display: flex;
          padding: 0 0 40px;
          justify-content: center;
        `};
    }
  }
`;

export const StyledCombinedSidebar = styled.div`
  position: relative;

  .Sidebar__toggle-button {
    position: absolute;
    z-index: 1000;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
    width: 100%;

    a {
      &:hover {
        background: none;
      }
    }
  }
`;
