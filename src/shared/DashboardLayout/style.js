import React from 'react';
import styled from 'styled-components';

export const StyledDashboardLayout = styled.div`
  flex-grow: 1;
  height: 100vh;
  display: flex;
  overflow: auto;

  .Page__Content {
    flex: 1;
    height: 100%;
    position: relative;
    transition: all 0.3s;
    height: 100vh;
    overflow: auto;

    &.Sidebar--active {
      transform: translateX(264px);
    }
  }

  .CustomerTable,
  .ResumeTable {
    flex: 1;
    margin-top: 64px;
  }

  .Drawer {
    box-shadow: -25px 1px 25px 0 rgba(0, 0, 0, 0.02),
      2px 0 11px 0 rgba(0, 0, 0, 0.25);
  }

  .CustomerViewDrawer {
    z-index: 1;

    .Drawer {
      top: 64px;
      transition: width 0.3s;
    }
  }

  /* @media screen and (max-width: 1024px) {
    .CustomerViewDrawer .Drawer {
      width: 100%;
    }
    .Sidebar {
      position: fixed;
      left: ${props => (props.showSidebar ? '0' : '-264px')};
      top: 0;
      bottom: 0;
      z-index: 100000;
    }
  } */
`;
