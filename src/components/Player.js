import React, { Component } from "react";
import "../styles/Player.css";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive
    };
  }

  render() {
    let classes = "player";

    if (this.state.isActive) {
      classes += " player--is-active";
    }

    return (
      <li
        className={classes}
        onClick={this.props.selectActivePlayer}
        data-player={this.props.playerNumber}
      >
        <p className="player__name">{this.props.name}</p>
        <p className="player__score">
          Score: <span className="player__score-value">{this.props.score}</span>
        </p>
      </li>
    );
  }
}

export default Player;
