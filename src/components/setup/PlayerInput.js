import React, { Component } from "react";

export const getInitialPlayerValue = (id) => {
  return {id, name: '', score: 0, isActive: false }
};

class PlayerInput extends Component {
  updateInputValue = event => {
    this.props.updateName(this.props.id, event.target.value);
  };

  render() {
    return (
      <input
        className="players-form__name-input"
        name={this.props.name}
        type="text"
        key={this.props.id}
        id={this.props.id}
        required
        placeholder="Player name"
        onChange={this.updateInputValue}
      />
    );
  }
}

export default PlayerInput;
