import React from "react";
import styled from "styled-components";
import Toast from "./Toast";
import { TransitionGroup } from "react-transition-group";

export const StyledContainer = styled("div")(props => ({
  display: "flex",
  position: "fixed",
  flexDirection: "column",
  right: 0,
  left: 0,
  zIndex: 999999999999,
  overflow: "hidden",
  margin: "0 auto",
  padding: "0 20px 20px",
  pointerEvents: "none",
  ...containerPos[props.position],
  "@media(max-width: 480px)": {
    padding: 0
  }
}));

const containerPos = {
  top: {
    top: 0,
    alignItems: "center"
  },
  bottom: {
    top: "auto",
    bottom: 0,
    flexDirection: "column-reverse",
    alignItems: "center"
  },
  left: {
    alignItems: "flex-start",
    bottom: 0
  },
  right: {
    alignItems: "flex-end"
  }
};

class ToastManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toasts: [], direction: "left" };
    props.bindNotify(this.notify);
    props.bindGetToasts(this.getToasts);
    props.bindCloseAll(this.closeAll);
  }

  idCounter = 0;

  getToasts = () => {
    return this.state.toasts;
  };

  closeAll = () => {
    this.getToasts().forEach(toast => this.closeToast(toast.id));
  };

  hasCustomId = settings => Object.hasOwnProperty.call(settings, "id");

  notify = (message, settings) => {
    const { toasts } = this.state;
    const newToast = this.createToast(message, settings);
    this.setState({
      toasts: [...toasts, newToast]
    });

    return newToast;
  };

  createToast = (message, settings) => {
    const uniqueId = ++this.idCounter;
    const id = this.hasCustomId(settings)
      ? `${settings.id}-${uniqueId}`
      : uniqueId;

    return {
      id,
      message,
      hasCloseButton: settings.hasCloseButton,
      timeout: settings.timeout || 3000,
      onClose: () => this.removeToast(id),
      status: settings.status,
      isOpen: true
    };
  };

  closeToast = id => {
    this.setState(previousState => {
      return {
        toasts: previousState.toasts.map(toast => {
          if (toast.id === id) {
            return {
              ...toast,
              isOpen: false
            };
          }
          return toast;
        })
      };
    });
  };

  removeToast = id => {
    const newToasts = this.state.toasts.filter(toast => toast.id !== id);
    this.setState({ toasts: newToasts });
  };

  render() {
    const { toasts, direction } = this.state;

    return (
      <StyledContainer position={direction} className={this.props.wrapperClass}>
        <TransitionGroup>
          {toasts.map(({ id, ...rest }) => (
            <Toast key={id} {...rest} direction={direction} />
          ))}
        </TransitionGroup>
      </StyledContainer>
    );
  }
}

export default ToastManager;
