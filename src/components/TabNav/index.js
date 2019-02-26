import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon';

const TabNavContainer = styled.div`
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
                <Icon name={link.icon} /> {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="TabNav__content-section">{children}</div>
    </TabNavContainer>
  );
}
