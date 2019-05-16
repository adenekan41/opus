import styled from 'styled-components';

export const StyledDashboardLayout = styled.div`
  flex-grow: 1;
  height: 100vh;
  display: flex;
  overflow: auto;
  justify-content: flex-end;

  .Page__Content {
    flex: 1;
    height: 100%;
    position: relative;
    transition: all 0.3s;
    min-height: 100vh;
    overflow: auto;
    background-color: #f5f6fa;
    padding-left: ${props => (props.showSidebar ? '64px' : '264px')};

    @media (max-width: 1024px) {
      padding-left: 64px;
    }

    &.Sidebar--active {
      transform: translateX(264px);
    }
  }
`;
