import React, { Component } from "react";

class PlayerInput extends Component {
  render() {
    return <input name={this.props.name} type="text" />;
  }
}

export default PlayerInput;
