import React, { Component } from "react";
import Header from "./components/stateless/Header";
import GameSetup from "./components/view/GameSetup";
import GameStart from "./components/view/GameStart";
import GameInProgress from "./components/view/GameInProgress";
import "./App.css";
import Button from "./components/stateless/Button";

export const gameCacheId = 'jmw-scorekeeper-game';

export const saveGameState = (state) => window.localStorage.setItem(gameCacheId, JSON.stringify(state));
export const getGameState = () => window.localStorage.getItem(gameCacheId);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.loadGameData(getGameState());
  }

  getDefaultState() {
    return {
      initialized: false,
      players: [],
      playerCount: 0,
      activePlayer: 0
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
      return this.getDefaultState();
    }
  }

  resetControls() {
    return (
        <div>
          <Button handler={this.startNewGame.bind(this)} label="Start Over" />
          <Button handler={this.resetScores.bind(this)} label="Reset Scores"/>
        </div>
    );
  }

  startNewGame() {
    if (!this.confirmReset()) {
      return;
    }

    window.localStorage.setItem(gameCacheId, '');

    this.setState(this.getDefaultState());
    this.render();
  }

  resetScores() {
    const game = this.state;

    game.players.forEach(player => {
      player.score = 0;
    });

    this.setState(game);
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
          {this.resetControls()}
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
          {this.resetControls()}
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
