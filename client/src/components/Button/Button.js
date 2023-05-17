import React, { Component } from 'react';

export default class Button extends Component {
  handleClick = e => {
    e.preventDefault();
    console.log('The link was clicked.');
    
      this.props.fun();
    
  };

  render() {
    return <button onClick={this.handleClick}>{this.props.text}</button>;
  }
}
