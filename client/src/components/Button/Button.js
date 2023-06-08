import React, { Component } from 'react';

export default class Button extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.fun();
  };

  render() {
    return (
      <button disabled={this.props.isDisable} onClick={this.handleClick}>
        {this.props.text}
      </button>
    );
  }
}
