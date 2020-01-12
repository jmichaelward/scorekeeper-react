import React, { Component } from "react";
import Header from "./components/stateless/Header";
import GameSetup from "./components/view/GameSetup";
import GameStart from "./components/view/GameStart";
import GameInProgress from "./components/view/GameInProgress";
import ResetControls from "./components/stateless/ResetControls";
import "./App.css";

const gameCacheId = 'jmw-scorekeeper-game';
const saveGameState = (state) => window.localStorage.setItem(gameCacheId, JSON.stringify(state));
const getGameState = () => window.localStorage.getItem(gameCacheId);

const defaultState = {
  initialized: false,
  players: [],
  playerCount: 0,
  activePlayer: 0
};

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

    this.setGameInitialized(game);
  }

  confirmReset(message) {
    return window.confirm(message);
  }

  loadGameView() {
    if (this.state.initialized) {
      return (
        <div>
          <GameInProgress
            players={this.state.players}
            playerCount={this.state.playerCount}
            activePlayer={this.state.activePlayer}
          />
          <ResetControls restart={this.startNewGame.bind(this)} reset={this.resetScores.bind(this)} />
        </div>
      );
    }

    if (this.state.playerCount > 0) {
      return (
        <div>
          <GameSetup
            players={this.state.players}
            playerCount={this.state.playerCount}
            setupPlayerData={this.setupPlayerData}
            setGameInitialized={this.setGameInitialized}
          />
          <ResetControls restart={this.startNewGame.bind(this)} />
        </div>
      );
    }

    return <GameStart setPlayerCount={this.setPlayerCount} />;
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

    for (let i = 0; i < count; i++) {
      players.push({
        id: i,
        name: "",
        score: 0,
        isActive: false
      });
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

  render() {
    return (
      <div className="game">
        <Header title="Scorekeeper" />
        {this.loadGameView()}
      </div>
    );
  }
}

export {
  App as default,
    gameCacheId,
    saveGameState,
    getGameState,
}
