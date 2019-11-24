import React, { Component } from "react";
import PlayerInput from "./PlayerInput";
import Button from "../stateless/Button";
import {saveGameState} from "../../App";

class PlayersForm extends Component {
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
        <div className="players-form">
          {getPlayerInputs(this.props.players, this.updateName)}
        </div>
        <Button type="submit" label="Start game" />
      </form>
    );
  }
}

const getPlayerInputs = (players, updateName) => {
  return players.map((player, index) => (
    <div className="players-form__player" key={index}>
      <p>Player {index + 1} name:</p>
      <PlayerInput id={index} name={player.name} updateName={updateName} />
    </div>
  ));
};

export default PlayersForm;
