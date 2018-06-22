import React, { Component } from "react";
import Player from "./Player";

class PlayersList extends Component {
  render() {
    return <Player name={this.props.name} score={0} />;
  }
}

export default PlayersList;
