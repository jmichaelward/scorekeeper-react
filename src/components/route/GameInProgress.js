import React, { Component } from "react";
import ScoreUpdater from "../ScoreUpdater";
import PlayersList from "../PlayersList";

class Game extends Component {
  render() {
    return (
      <div className="scorekeeper-game">
        <ScoreUpdater />
        <PlayersList />
      </div>
    );
  }
}

export default Game;
