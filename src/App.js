import React, { Component } from "react";
import Header from "./components/Header";
import GameSetup from "./components/route/GameSetup";
import GameStart from "./components/route/GameStart";
import GameInProgress from "./components/route/GameInProgress";

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
            playerCount={this.state.playerCount}
            setGameInitialized={this.setGameInitialized}
          />
        );
      default:
        return <GameStart setPlayerCount={this.setPlayerCount} />;
    }
  }

  /*
    Set the number of players that were indiccated to play this game.
    */
  setPlayerCount = count => {
    this.setState({ playerCount: count });
    this.initPlayers(count);
  };

  initPlayers(count) {
    const players = [];

    for (let i = 0; i < count; i++) {
      players.push({
        name: "",
        score: 0
      });
    }

    this.setState({ players });
  }

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
