import React from 'react';
import { Text } from 'rebass';
import Button, { EmptyButton } from '../Button';
import { Icon } from '../Icon';
import { GlobalStyle, StyledModal } from './style';

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
  children: <Text>This is the default Modal content</Text>,
  isFullScreenOnMobile: true,
  bgColor: '#f5f6fa',
  closeIconColor: '#273444',
  showCloseIcon: false,
  closeIconSize: 18,
  domNode: null,
};

export class Confirm extends React.Component {
  render() {
    const {
      heading,
      showModal,
      description,
      onCloseModal,
      onConfirm,
      isLoading,
      primaryButtonProps,
      secondaryButtonProps,
    } = this.props;
    return (
      <Modal
        heading={heading}
        showModal={showModal}
        onCloseModal={onCloseModal}
        isFullScreenOnMobile={false}
      >
        <div className="confirm">
          <Text textAlign="center">{description}</Text>
          <div className="confirm__btn-group">
            <Button
              kind="gray"
              className="confirm__btn-group__secondary-btn"
              onClick={onCloseModal}
              {...secondaryButtonProps}
            >
              Cancel
            </Button>
            <Button
              kind="red"
              isLoading={isLoading}
              className="confirm__btn-group__primary-btn"
              onClick={() => {
                onConfirm();
                onCloseModal();
              }}
              {...primaryButtonProps}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

Confirm.defaultProps = {
  heading: 'Title',
  description: 'Are you sure?',
  onConfirm: () => {},
};

export default Modal;
