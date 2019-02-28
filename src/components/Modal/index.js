import React from 'react';
import ReactModal from 'react-modal';
import { Text } from 'rebass';
import styled, { css, createGlobalStyle } from 'styled-components';
import { EmptyButton } from '../Button';
import { Icon } from '../Icon';

export const breakpoints = {
  small_mobile: '360px',
  mobile: '480px',
  tablet: '768px',
  large_tablet: '992px',
  desktop: '1200px',
  large_desktop: '1440px',
};

const GlobalStyle = createGlobalStyle`

.ReactModal__Body--open{
  overflow: hidden;
}

.ReactModalPortal{
  & .ReactModal__Content {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity .3s ease-in-out, transform .6s cubic-bezier(0,0,0,1);
    
    &--after-open {
      transform: scale(1);
      opacity: 1;
    }
    
    &--before-close {
      transform: scale(1);
      opacity: 0;
    }
  }
  
  & .ReactModal__Overlay {
    opacity: 0;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.6) !important;
    transition: opacity 200ms ease-in-out;
    padding: 40px 0;
    z-index: 999999999999;

    &--after-open {
      opacity: 1;
    }

    &--before-close {
      opacity: 0;
    }

  }

  .confirm{
    &__btn-group {
      display: flex;
      justify-content: flex-end;
      margin-top: 24px;

      &__primary-btn {
        margin-left: 16px;
      }
    }
  }  
}
`;

export const modalSize = {
  big: '800px',
  medium: '640px',
  default: '560px',
  small: '480px',
};

const fullWidthModal = `
  border-radius: 0;
    max-width: 100%;
    height: 100vh;
    margin: -40px 0;
`;

export const StyledModal = styled(ReactModal)`
  background: ${props => props.bgColor};
  position: relative;
  top: 24%;
  left: 0;
  right: 0;
  bottom: 0;
  border: none;
  overflow: ${props => props.overflow || 'auto'};
  margin: 0 auto;
  max-width: ${props => modalSize[props.size || 'default']};

  @media screen and (min-width: ${breakpoints.mobile}) {
    border-radius: 4px;
  }

  &:focus {
    outline: none;
  }

  ${props =>
    props.isFullScreenOnMobile &&
    css`
      @media (max-width: ${breakpoints.mobile}) {
        ${fullWidthModal};
      }
    `};

  ${props =>
    props.isFullScreen &&
    `
      ${fullWidthModal}
  `};

  & .Modal__Header {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    height: 60px;
    padding: 0 32px !important;
    padding-top: 48px !important;
    padding-bottom: 24px !important;

    position: relative;

    ${props => props.headingCSS};

    &__title {
      flex: 1;
      font-size: 20px;
    }

    &__close-btn {
      border-radius: 100%;
      padding: 8px;
      position: absolute;
      right: 24px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }

      &:focus {
        outline: 0;
      }

      ${props =>
        (props.isFullScreen || !props.removeHeading) &&
        css`
          position: absolute;
          z-index: 200;
          right: 24px;
          top: 24px;
        `};

      ${props =>
        !props.showCloseIcon &&
        css`
          display: none;
        `};
    }
  }

  ${props =>
    !props.isFullScreen &&
    css`
      & .Modal__Body {
        padding: 16px 32px 32px;
        padding-top: 0;
      }
    `};
`;

export class ToggleModal extends React.Component {
  state = {
    show: this.props.show || false,
  };
  openModal = () => {
    this.setState({
      show: true,
    });
  };
  closeModal = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    return (
      <>
        {this.props.children(this.state.show, this.openModal, this.closeModal)}
      </>
    );
  }
}

export class Modal extends React.Component {
  render() {
    const {
      className,
      size,
      heading,
      children,
      bgColor,
      headingCSS,
      closeIconColor,
      closeIconSize,
      showModal,
      zIndex,
      showCloseIcon,
      isFullScreen,
      onCloseModal,
      isFullScreenOnMobile,
      domNode,
      overflow,
    } = this.props;
    const closeIcon = (
      <EmptyButton onClick={onCloseModal} className="Modal__Header__close-btn">
        <Icon color={closeIconColor} name="close" size={closeIconSize} />
      </EmptyButton>
    );
    return (
      <>
        <GlobalStyle />
        <StyledModal
          as={domNode}
          isOpen={showModal}
          className={className}
          overflow={overflow}
          contentLabel="Modal Example"
          headingCSS={headingCSS}
          onRequestClose={onCloseModal}
          shouldCloseOnOverlayClick={false}
          closeTimeoutMS={150}
          removeHeading={Boolean(heading)}
          role="dialog"
          {...{
            isFullScreenOnMobile,
            showCloseIcon,
            isFullScreen,
            size,
            bgColor,
            zIndex,
          }}
        >
          {!isFullScreen && Boolean(heading) ? (
            <div className="Modal__Header">
              <Text
                fontWeight="bold"
                className="Modal__Header__title"
                textAlign="center"
                fontSize="18px"
              >
                {heading}
              </Text>

              {closeIcon}
            </div>
          ) : (
            closeIcon
          )}

          <div className="Modal__Body">{children}</div>
        </StyledModal>
      </>
    );
  }
}

Modal.defaultProps = {
  // heading: "Modal Heading",
  children: <Text>This is the default Modal content</Text>,
  isFullScreenOnMobile: true,
  // size: "regular",
  bgColor: '#f5f6fa',
  closeIconColor: '#273444',
  showCloseIcon: false,
  closeIconSize: 18,
  domNode: null,
};

export default Modal;
