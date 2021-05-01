import React, { useState } from "react";
import PlayerInput from "../PlayerInput";
import Button from "../Button";
import './PlayersForm.scss';

/**
 * Component for the form to enter the list of players.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PlayersForm = (props) => {
  const [game, setGame] = useState(props.game);
  const { players } = game;

  /**
   * Returns a set of player inputs for the form.
   *
   * @param players
   * @param updateName
   * @returns {*}
   */
  const getPlayerInputs = (players, updateName) => {
    return players.map((player, index) => (
      <div className="players-form__player" key={index}>
        <p>Player {index + 1} name:</p>
        <PlayerInput id={index} name={player.name} updateName={updateName} />
      </div>
    ));
  };

  const savePlayerData = event => {
    event.preventDefault();
    props.setGameInitialized(true);
    props.setupPlayerData(players);
  };

  const updateName = (index, name) => {
    game.players[index].name = name;
    setGame(game);
  };

  return (
    <form className="players-form" onSubmit={savePlayerData}>
      <div className="players-form">
        {getPlayerInputs(players, updateName)}
      </div>
      <Button type="submit" label="Start game" wrapClass="game-start-button-wrap" />
    </form>
  );
}

export default PlayersForm;
