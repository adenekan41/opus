import React, { Component, Fragment } from "react";

export class ToggleHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  onClose = () => {
    this.setState({ isOpen: true });
  };

  onOpen = () => {
    this.setState({ isOpen: false });
  };

  onToggle = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  };

  render() {
    return (
      <Fragment>
        {this.props.children(
          this.state.isOpen,
          this.onOpen,
          this.onClose,
          this.onToggle
        )}
      </Fragment>
    );
  }
}

export default ToggleHandler;