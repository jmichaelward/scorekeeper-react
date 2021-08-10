import React from "react";
import Button from "../Button";

const GameStart = (props) => {
  const { game, setPlayerCount } = props;
  const playerCountRef = React.createRef();

  const getNumberOfPlayers = event => {
    event.preventDefault();
    setPlayerCount(game, parseInt(playerCountRef.current.value, 10));
  };

    return (
      <form className="game-start" onSubmit={getNumberOfPlayers}>
        <p id="instructions">Welcome to Scorekeeper. How many players?</p>

        <div>
          <label>Number of Players:</label>
          <input
            id="game-start__player-count"
            type="number"
            min="0"
            max="9"
            name="playerCount"
            ref={playerCountRef}
            required
            placeholder={1}
          />
          <Button type="submit" label="Click to Start" />
        </div>
      </form>
    );
}

export default GameStart;
