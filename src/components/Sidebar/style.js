import styled, { css } from 'styled-components';

export const SidebarContainer = styled.div`
  width: ${props => (props.isCollapsed ? '64px' : '264px')};
  height: 100vh;
  position: fixed;
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

    &__Logo {
      margin: ${props =>
        props.isCollapsed ? '20px 10px 20px' : '20px 40px 20px'};
    }

    &__Header {
      flex-grow: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e8e8e8;
      margin: 36px 26px;
      padding-bottom: 30px;
      transition: all 0.3s;

      ${props =>
        props.isCollapsed &&
        css`
          margin-right: 10px;
          margin-left: 10px;
          justify-content: center;

          button {
            font-size: 12px;
          }
        `}

      .Logo {
        transform: translateX(-12px);
      }
    }

    &__Main {
      flex: 1;
      overflow-y: scroll;

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
