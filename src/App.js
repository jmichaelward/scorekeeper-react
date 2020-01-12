import React, { Component } from "react";
import config from './config/app.json';
import Header from "./components/Header";
import GameSetup from "./view/GameSetup";
import GameStart from "./view/GameStart";
import GameInProgress from "./view/GameInProgress";
import ResetControls from "./components/ResetControls";
import { getInitialPlayerValue } from "./components/PlayerInput";
import "./App.scss";

const { gameCacheId, defaultState } = config;
const saveGameState = (state) => window.localStorage.setItem(gameCacheId, JSON.stringify(state));
const getGameState = () => window.localStorage.getItem(gameCacheId);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.loadGameData(getGameState());
  }

  loadGameData(gameInProgress) {
    try {
      const {
        players,
        playerCount,
        activePlayer
      } = JSON.parse(gameInProgress);

      return {
        initialized: true,
        players,
        playerCount,
        activePlayer,
      };
    } catch (e) {
      return defaultState;
    }
  }

  startNewGame() {
    if (!this.confirmReset("Are you sure you want to reset this game? All data will be lost.")) {
      return;
    }

    window.localStorage.setItem(gameCacheId, '');

    this.setState(defaultState);
  }

  resetScores() {
    if (!this.confirmReset("Are you sure you want to reset scores for this game?")) {
      return;
    }

    const game = this.state;

    game.players.forEach(player => {
      player.score = 0;
    });

    this.setState(game);
  }

  confirmReset(message) {
    return window.confirm(message);
  }

  /*
    Set the number of players that were indicated to play this game.
    */
  setPlayerCount = count => {
    this.setState({ playerCount: count });
    this.initializePlayers(count);
  };

  initializePlayers(count) {
    const players = [];

    for (let playerId = 0; playerId < count; playerId++) {
      players.push(getInitialPlayerValue(playerId));
    }

    this.setupPlayerData(players);
  }

  setupPlayerData = players => {
    this.setState({ players });
  };

  /*
    Set the game initialization status.
    We'll load the game in progress if the game has been initialized.
     */
  setGameInitialized = initialized => {
    this.setState({ initialized });
  };

  /**
   * Render the game view.
   *
   * @returns {*}
   */
  render() {
    const { initialized, playerCount } = this.state;
    return (
      <div className="game">
        <Header title="Scorekeeper" />
        {
          initialized && playerCount > 0 ?
              <div>
                <GameInProgress
                    players={this.state.players}
                    playerCount={this.state.playerCount}
                    activePlayer={this.state.activePlayer}
                />
                <ResetControls restart={this.startNewGame.bind(this)} reset={this.resetScores.bind(this)} />
              </div>
          : playerCount === 0 ?
              <GameStart setPlayerCount={this.setPlayerCount} />
            :
              <div>
                <GameSetup
                    players={this.state.players}
                    playerCount={this.state.playerCount}
                    setupPlayerData={this.setupPlayerData}
                    setGameInitialized={this.setGameInitialized}
                />
                <ResetControls restart={this.startNewGame.bind(this)} />
              </div>
        }
      </div>
    );
  }
}

export {
  App as default,
    saveGameState,
    getGameState,
}
