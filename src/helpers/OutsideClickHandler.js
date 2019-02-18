import React, { Component } from 'react';

export default class OutsideClickHandler extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.props.onClickOutside();
    }
  };

  render() {
    const { ...rest } = this.props;
    return (
      <div
        className="OutsideClickHandler"
        ref={this.setWrapperRef}
        style={this.props.style}
        {...rest}
      >
        {this.props.children}
      </div>
    );
  }
}
