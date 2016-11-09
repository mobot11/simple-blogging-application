import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
    {/*nested components become children to their parents and need to be rendered as such*/}
      {this.props.children}
      </div>
    );
  }
}
