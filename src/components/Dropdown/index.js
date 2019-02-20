import React, { Component } from "react";
import styled,  { css } from "styled-components";
import { Manager, Reference, Popper } from "react-popper";
import { CSSTransition } from "react-transition-group";
import OutsideClickHandler from "../../helpers/OutsideClickHandler";
import Button from "../Button";
import { Icon } from "../Icon";

const StyledItemGroup = styled.ul`
  align-items: center;
  color: rgb(107, 119, 140);
  display: flex;
  flex: 1 1 auto;
  padding: 8px 12px;

  .ItemGroup__Title {
    font-size: 11px;
    line-height: 1;
    text-transform: uppercase;
    min-width: 0px;
    flex: 1 1 auto;
  }
`;

export const ItemGroup = ({ children }) => (
  <StyledItemGroup className="ItemGroup" role="menu">
    <div class="ItemGroup__Title">{children}</div>
  </StyledItemGroup>
);

const StyledItem = styled.li`
  align-items: center;
  cursor: pointer;
  display: flex;
  background-color: transparent;
  color: #273444;
  font-size: 14px;
  flex: 0 0 auto;
  text-decoration: none;
  padding: 12px 16px;
  border-bottom: 1px solid #f4f5f7;

  &:hover,
  &:focus {
    background-color: #f4f5f7;

    ${props =>
      props.isNegative &&
      css`
        > * {
          color: #E85257;
        }
      `}
  }

  &:focus {
    outline: 0;
  }

  .Icon {
    margin-right: 12px;
  }
`;

export const Item = ({
  children,
  href,
  icon,
  onClick,
  testId,
  isNegative,
  ...rest
}) => (
  <StyledItem
    className="Item"
    role="menuitem"
    tabIndex="0"
    onKeyDown={e => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        onClick();
      } else {
        return;
      }
    }}
    {...{ onClick, isNegative, ...rest }}
  >
    {icon && <Icon name={icon} />}
    <div href={href} data-action={testId} className="Item__Content">
      {children}
    </div>
  </StyledItem>
);


const StyledDroplist = styled.div`
  position: relative;
  display: inline-flex;

  .Droplist__Trigger {
    user-select: none;
    outline: 0;
    cursor: pointer;
    display: inline;
  }
`;

const Dropdown = styled.div`
  min-width: 160px;
  width: ${props => props.width};
  margin: 2px;
  background-color: #fbfbfb;
  border-radius: 3px;
  border: 1px solid #cccccc;
  box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
  max-height: ${props => props.maxHeight};
  overflow: auto;
  z-index: 2;
`;

export class Droplist extends Component {
  state = {
    showDropdown: false
  };

  toggleDroplist = () => {
    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown
    }));
  };

  closeDroplist = () => {
    this.setState({ showDropdown: false });
  };

  render() {
    const {
      trigger,
      children,
      maxHeight,
      width,
      placement = "right"
    } = this.props;
    const { showDropdown } = this.state;
    return (
      <StyledDroplist className="Droplist" {...{ maxHeight }}>
        <OutsideClickHandler onClickOutside={this.closeDroplist}>
          <Manager>
            <Reference>
              {({ ref }) => (
                <div
                  ref={ref}
                  className="Droplist__Trigger"
                  onClick={this.toggleDroplist}
                  onKeyDown={this.handleKeyDown}
                  role="button"
                  tabIndex="-1"
                >
                  {trigger}
                </div>
              )}
            </Reference>
            <CSSTransition
              classNames="Tooltip"
              in={showDropdown}
              timeout={50}
              unmountOnExit
            >
              <Popper
                className="Tooltip"
                placement={placement}
                modifiers={{
                  preventOverflow: { enabled: false },
                  hide: { enabled: false }
                }}
                eventsEnabled={true}
                positionFixed={true}
              >
                {({ ref, style }) => (
                  <Dropdown
                    ref={ref}
                    width={width}
                    style={style}
                    role="menu"
                    className="Droplist__Dropdown"
                  >
                    {typeof children === "function"
                      ? children(this.closeDroplist)
                      : children}
                  </Dropdown>
                )}
              </Popper>
            </CSSTransition>
          </Manager>
        </OutsideClickHandler>
      </StyledDroplist>
    );
  }
}

Droplist.defaultProps = {
  trigger: <Button size="small">Trigger</Button>,
  children: "Droplist Children"
};
