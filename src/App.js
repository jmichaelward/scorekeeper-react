import React, { Component } from "react";
import Header from "./components/Header";
import GameSetup from "./components/route/GameSetup";
import GameStart from "./components/route/GameStart";
import GameInProgress from "./components/route/GameInProgress";

class App extends Component {
  state = {
    initialized: false,
    players: {},
    playerCount: 0
  };

  constructor() {
    super();
    this.views = {
      start: <GameStart setPlayerCount={this.setPlayerCount} />,
      setup: <GameSetup />,
      inProgress: <GameInProgress />
    };
  }

  loadGameView() {
    if (this.state.initialized) {
      return this.views.inProgress;
    }

    switch (!this.state.initialized) {
      case this.state.playerCount > 0:
        return this.views.setup;
      default:
        return this.views.start;
    }
  }

  setPlayerCount = count => {
    this.setState({ playerCount: count });
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
