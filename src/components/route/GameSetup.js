import React, { Component } from "react";
import PlayerInput from "../setup/PlayerInput";

class GameSetup extends Component {
  state = {
    players: []
  };

  savePlayerData = event => {
    event.preventDefault();
    this.props.setGameInitialized(true);
    this.props.setupPlayerData(this.state.players);
  };

  updateName = (index, name) => {
    const players = this.props.players;

    players[index].name = name;

    this.setState({ players });
  };

  createPlayerInputs() {
    const playerInputs = [];

    for (let i = 0; i < this.props.playerCount; i++) {
      playerInputs.push(
        <PlayerInput
          id={i}
          name={this.props.players[i].name}
          updateName={this.updateName}
          key={i}
        />
      );
    }

    return playerInputs;
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
