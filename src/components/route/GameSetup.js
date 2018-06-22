import React, { Component } from "react";
import PlayerInput from "../setup/PlayerInput";

class GameSetup extends Component {
  savePlayerData = () => {
    this.props.setGameInitialized(true);
  };

  createPlayerInputs() {
    const players = [];

    for (let i = 0; i < this.props.playerCount; i++) {
      let name = "player" + i;
      players.push(<PlayerInput key={name} name={name} />);
    }

    return players;
  }

  render() {
    return (
      <form className="game-setup" onSubmit={this.savePlayerData}>
        <p>Enter player names.</p>
        <div className="players-list">{this.createPlayerInputs()}</div>
        <button type="submit">Start game</button>
      </form>
    );
  }
}

export default GameSetup;
