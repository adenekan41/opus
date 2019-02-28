import styled from 'styled-components';

export const TabNavContainer = styled.div`
  .TabNav__navigation__tabs {
    display: flex;
    flex-flow: row wrap;
    border-bottom: 1px solid #bababa;
    list-style: none;
    padding: 0;
    margin-bottom: 30px;
  }
  .TabNav__navigation__tab {
    max-width: 140px;
    flex: 0 0 140px;
    padding-right: 24px;
    @media (max-width: 874px) {
      padding-right: 32px;
    }
    @media (max-width: 773px) {
      padding-right: 16px;
    }
    a {
      text-decoration: none;
      color: #b4b4b4;
      font-size: 14px;
      display: flex;
      align-items: center;
      padding-bottom: 4px;

      .Icon {
        color: #b4b4b4;
        margin-right: 6px;
      }

      &:focus {
        .Icon {
          color: #242424;
        }
      }

      &.active {
        font-weight: bold;
        color: #242424;
        border-bottom: 2px solid #ff9901;

        .Icon {
          color: #242424;
        }
      }
    }
  }
`;

export const StyledTabs = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;
  min-height: 0%;
`;

export const TabPanel = styled.div`
  ${props => props.css}
`;

export const StyledTabItem = styled.li`
  color: #242424;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  font-weight: medium;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
  flex: ${props => (props.isFitted ? '1' : 'initial')};
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  padding: 0 ${props => props.spacing || '0'};

  &:hover {
    color: #273444;
    box-shadow: inset 0 -2px 0 0 #cfd3d9;
  }

  &.TabItem--selected {
    color: #242424;

    box-shadow: inset 0 -2px 0 0 #ff9901;
    :hover {
      color: #242424;
      box-shadow: inset 0 -2px 0 0 #ff9901;
    }
  }

  &:focus {
    outline: 0;
  }
`;

export const StyledTabList = styled.ul`
  display: flex;
  font-weight: medium;
  list-style-type: none;
  height: ${props => props.height};
  padding: 0;
  border-bottom: ${props =>
    props.showBorderBottom ? `1px solid #dcdcdc` : `none`};
  box-shadow: ${props =>
    props.showNavLine ? `0 -2px 0px 0 inset #F4F5F7` : 'none'};
  /* text-overflow: ellipsis;
  text-transform: uppercase; */
  justify-content: center;

  ${props => props.css}
`;
