import React, { Component } from "react";
import PlayerInput from "./PlayerInput";

class PlayersForm extends Component {
  state = {
    players: []
  };

  createPlayerInputs() {
    const playerInputs = [];

    for (
      let i = 0, playerCount = this.props.players.length;
      i < playerCount;
      i++
    ) {
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

  render() {
    return (
      <form className="players-form" onSubmit={this.savePlayerData}>
        <div className="players-list">{this.createPlayerInputs()}</div>
        <button type="submit">Start game</button>
      </form>
    );
  }
}

export default PlayersForm;
