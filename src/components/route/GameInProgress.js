import React, { Component } from "react";
import ScoreUpdater from "../ScoreUpdater";
import PlayersList from "../PlayersList";

class GameInProgress extends Component {
  render() {
    return (
      <div className="scorekeeper-game">
        <ScoreUpdater />
        <PlayersList players={this.props.players} />
      </div>
    );
  }
}

export default GameInProgress;
