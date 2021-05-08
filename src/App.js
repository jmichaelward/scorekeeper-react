import React, { Component } from "react";
import config from './config/app.json';
import Header from "./components/Header";
import GameSetup from "./components/Views/GameSetup";
import GameStart from "./components/Views/GameStart";
import GameInProgress from "./components/Views/GameInProgress";
import ResetControls from "./components/ResetControls";
import { getInitialPlayerValue } from "./components/PlayerInput";
import "./App.scss";

const { gameCacheId, defaultState } = config;
const saveGameState = (state) => window.localStorage.setItem(gameCacheId, JSON.stringify(state));
const getGameState = () => window.localStorage.getItem(gameCacheId);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.loadGameData(getGameState())
    };
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
    if (!window.confirm("Are you sure you want to reset this game? All data will be lost.")) {
      return;
    }

    window.localStorage.setItem(gameCacheId, '');

    this.setState({ game: defaultState });
  }

  resetScores() {
    if (!window.confirm("Are you sure you want to reset scores for this game?")) {
      return;
    }

    const { game } = this.state;

    game.players.forEach(player => {
      player.score = 0;
    });

    game.activePlayer = 0;

    this.setState({ game: game });
  }

  /*
    Set the number of players that were indicated to play this game.
    */
  setPlayerCount = (game, count) => {
    this.setState({ game: this.initializePlayers(game, count) });
  };

  initializePlayers(game, count) {
    game.players = [];

    for (let playerId = 0; playerId < count; playerId++) {
      game.players.push(getInitialPlayerValue(playerId));
    }

    game.playerCount = game.players.length;

    return game;
  }

  setupPlayerData = players => {
    const game = this.state.game;

    game.players = players;

    this.setState({ game: game });
  };

  /*
    Set the game initialization status.
    We'll load the game in progress if the game has been initialized.
     */
  setGameInitialized = (game, initialized) => {
    game.initialized = initialized;

    this.setState({ game: game });
  };

  /**
   * Update the game state and save it.
   *
   * @param game
   */
  updateGameState = game => {
    saveGameState(game);
    this.setState({ game: game });
  };

  /**
   * Returns the GameStart view.
   *
   * @returns {JSX.Element}
   */
  getGameStart = () => <GameStart game={this.state.game} setPlayerCount={this.setPlayerCount} />

  /**
   * Returns the GameSetup view.
   *
   * @returns {JSX.Element}
   */
  getGameSetup = () => {
    return (
      <div>
        <GameSetup
          game={this.state.game}
          setupPlayerData={this.setupPlayerData}
          setGameInitialized={this.setGameInitialized}
        />
        <ResetControls restart={this.startNewGame.bind(this)} />
      </div>
    );
  }

  /**
   * Returns the GameInProgress view.
   *
   * @returns {JSX.Element}
   */
  getGameInProgress = () => {
    return (
      <div>
        <GameInProgress game={this.state.game} update={this.updateGameState} />
        <ResetControls restart={this.startNewGame.bind(this)} reset={this.resetScores.bind(this)} />
      </div>
    );
  }

  /**
   * Determines which view to load based on the state of the game data.
   *
   * @returns {*}
   */
  loadViewComponent = () => {
    const { initialized, playerCount } = this.state.game;

    if (initialized && playerCount > 0) {
      return this.getGameInProgress();
    }

    return playerCount > 0 ? this.getGameSetup() : this.getGameStart();
  }

  /**
   * Render the game view.
   *
   * @returns {*}
   */
  render() {
    return (
      <div className="game">
        <Header title="Scorekeeper" />
        {this.loadViewComponent()}
      </div>
    );
  }
}

export {
  App as default,
    saveGameState,
    getGameState,
}
