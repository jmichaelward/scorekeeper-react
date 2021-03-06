import React from "react";
import PlayersForm from "../PlayersForm";

const GameSetup = (props) => {
  const { game, setGameInitialized } = props;

    return (
      <div className="game-setup">
        <p>Please enter a name for each player.</p>
        <PlayersForm
          game={game}
          setGameInitialized={setGameInitialized}
        />
      </div>
    );
}

export default GameSetup;
