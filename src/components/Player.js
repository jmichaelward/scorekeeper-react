import React, { Component } from "react";

class Player extends Component {
  render() {
    return (
      <div className="player">
        <p>{this.props.name}</p>
        <p>{this.props.score}</p>
      </div>
    );
  }
}

export default Player;
