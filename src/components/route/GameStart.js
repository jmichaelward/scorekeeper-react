import React, { Component } from "react";
import Button from "../stateless/Button";

class GameStart extends Component {
  playerCountRef = React.createRef();

  getNumberOfPlayers = event => {
    event.preventDefault();
    const playerCount = parseInt(this.playerCountRef.current.value, 10);

    this.props.setPlayerCount(playerCount);
  };

  render() {
    return (
      <form className="game-start" onSubmit={this.getNumberOfPlayers}>
        <p>Welcome to Scorekeeper. How many players?</p>
        <label>Number of Players:</label>
        <input
          type="num"
          name="playerCount"
          ref={this.playerCountRef}
          required
          placeholder={1}
        />
        <Button type="submit" label="Click to Start" />
      </form>
    );
  }
}

export default GameStart;
