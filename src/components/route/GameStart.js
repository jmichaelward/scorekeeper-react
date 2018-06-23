import React, { Component } from "react";

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
        <p>Starting a new game.</p>
        <label>Number of Players:</label>
        <input
          type="num"
          name="playerCount"
          ref={this.playerCountRef}
          required
          placeholder={1}
        />
        <button type="submit">Create new game</button>
      </form>
    );
  }
}

export default GameStart;
