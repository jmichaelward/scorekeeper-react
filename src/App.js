import React, { Component } from "react";
import Header from "./components/stateless/Header";
import GameSetup from "./components/view/GameSetup";
import GameStart from "./components/view/GameStart";
import GameInProgress from "./components/view/GameInProgress";
import ResetButton from "./components/stateless/ResetButton";
import "./App.css";

export const gameCacheId = 'jmw-scorekeeper-game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const gameInProgress = this.getGameInProgress();

    if (gameInProgress) {
      return this.loadGameData(gameInProgress);
    }

    return {
      initialized: false,
      players: [],
      playerCount: 0,
      activePlayer: 0
    };
  }

  getGameInProgress() {
    return window.localStorage.getItem(gameCacheId);
  }

  loadGameData(gameInProgress) {
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
  }

  resetButton() {
    return <ResetButton handler={this.startNewGame.bind(this)} />;
  }

  startNewGame() {
    if (!this.confirmReset()) {
      return;
    }

    window.localStorage.setItem(gameCacheId, '');

    this.setState(this.getInitialState());
    this.render();
  }

  confirmReset() {
    return window.confirm(
      "Are you sure you want to reset this game? All data will be lost."
    );
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
          {this.resetButton()}
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
          {this.resetButton()}
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

export default App;
