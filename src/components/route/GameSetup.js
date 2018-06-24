import React, { Component } from "react";
import PlayersForm from "../setup/PlayersForm";

class GameSetup extends Component {
  render() {
    return (
      <div className="game-setup">
        <p>Enter player names.</p>
        <PlayersForm
          players={this.props.players}
          setGameInitialized={this.props.setGameInitialized}
          setupPlayerData={this.props.setupPlayerData}
        />
      </div>
    );
  }
}

export default GameSetup;
