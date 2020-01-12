import React, { Component } from "react";
import Button from "../components/Button";

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
        <p id="instructions">Welcome to Scorekeeper. How many players?</p>

        <div>
          <label>Number of Players:</label>
          <input
            id="game-start__player-count"
            type="number"
            min="0"
            max="9"
            name="playerCount"
            ref={this.playerCountRef}
            required
            placeholder={1}
          />
          <Button type="submit" label="Click to Start" />
        </div>
      </form>
    );
  }
}

export default GameStart;
