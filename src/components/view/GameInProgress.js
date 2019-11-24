import React, { Component } from "react";
import PlayersList from "../PlayersList";
import { gameCacheId } from "../../App";

class GameInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: props.players,
      playerCount: props.playerCount,
      activePlayer: props.activePlayer
    };

    window.localStorage.setItem(gameCacheId, JSON.stringify(this.state));
  }

  handleScoreUpdate(event) {
    event.preventDefault();

    const form = event.target;
    const score = parseInt(form.querySelector("#scoreInput").value, 10);

    this.setPlayerScore(score);

    form.reset();
  }

  setPlayerScore(score) {
    let newState = this.state;
    const activePlayerIndex = this.state.activePlayer;
    const nextActivePlayerIndex = this.getNextActivePlayerIndex();
    const players = document.getElementsByClassName("player");
    const activePlayer = players[activePlayerIndex];
    const nextPlayer = players[nextActivePlayerIndex];

    newState.players[activePlayerIndex].score += isNaN(score) ? 0 : score;
    newState.activePlayer = nextActivePlayerIndex;

    this.setState(newState);
    this.setActivePlayer(nextPlayer, activePlayer);
  }

  getNextActivePlayerIndex() {
    const playerIndex = this.props.playerCount - 1;
    const activePlayer = parseInt(this.state.activePlayer, 10);

    return activePlayer < playerIndex ? activePlayer + 1 : 0;
  }

  setActivePlayer(
    nextPlayer,
    previousPlayer,
    activeSelector = "player--is-active"
  ) {
    if (nextPlayer === previousPlayer) {
      return;
    }

    previousPlayer.classList.remove(activeSelector);
    nextPlayer.classList.add(activeSelector);
  }

  selectActivePlayer(event) {
    const activeSelector = "player--is-active";
    const player = event.currentTarget;
    const prevActive = player.parentElement.querySelector(`.${activeSelector}`);

    this.setActivePlayer(player, prevActive, activeSelector);

    this.setState(
      { activePlayer: player.getAttribute("data-player") },
      this.setActivePlayer(player, prevActive)
    );
  }

  render() {
    return (
      <div className="scorekeeper-game">
        <h2>Update Player Score</h2>
        <div className="score-updater">
          <form
            id="scoreAdjustmentForm"
            onSubmit={this.handleScoreUpdate.bind(this)}
          >
            <input
              id="scoreInput"
              type="number"
              pattern="^-?([0-9]{1,9})$"
              maxLength="9"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <PlayersList
          id="players-list"
          players={this.state.players}
          activePlayer={this.state.activePlayer}
          selectActivePlayer={this.selectActivePlayer.bind(this)}
        />
      </div>
    );
  }
}

export default GameInProgress;
