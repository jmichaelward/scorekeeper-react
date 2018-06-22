import React, { Component } from "react";
import PlayerInput from "./PlayerInput";

class PlayersForm extends Component {
  handleSubmit() {
    alert("form submitted");
  }

  render() {
    return <form onSubmit={this.handleSubmit}>{this.props.players}</form>;
  }
}

export default PlayersForm;
