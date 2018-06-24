import React, { Component } from "react";
import Header from "./components/stateless/Header";
import GameSetup from "./components/view/GameSetup";
import GameStart from "./components/view/GameStart";
import GameInProgress from "./components/view/GameInProgress";

class App extends Component {
  state = {
    initialized: false,
    players: [],
    playerCount: 0
  };

  loadGameView() {
    if (this.state.initialized) {
      return <GameInProgress players={this.state.players} />;
    }

    switch (!this.state.initialized) {
      case this.state.playerCount > 0:
        return (
          <GameSetup
            players={this.state.players}
            playerCount={this.state.playerCount}
            setupPlayerData={this.setupPlayerData}
            setGameInitialized={this.setGameInitialized}
          />
        );
      default:
        return <GameStart setPlayerCount={this.setPlayerCount} />;
    }
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
        name: "",
        score: 0
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
