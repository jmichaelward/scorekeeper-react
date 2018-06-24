import React, { Component } from "react";

class PlayerInput extends Component {
  updateInputValue = event => {
    this.props.updateName(this.props.id, event.target.value);
  };

  render() {
    return (
      <input
        name={this.props.name}
        type="text"
        id={this.props.id}
        required
        placeholder="Player name"
        onChange={this.updateInputValue}
      />
    );
  }
}

export default PlayerInput;
