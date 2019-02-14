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
    background-color: #f5f6fa;

    &.Sidebar--active {
      transform: translateX(264px);
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
