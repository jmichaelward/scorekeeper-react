import React, { Component } from "react";
import Player from "./Player";

class PlayersList extends Component {
  renderPlayers(players) {
    let items = [];

    for (let i = 0, playerCount = players.length; i < playerCount; i++) {
      items.push(
        <Player
          key={i}
          name={this.props.players[i].name}
          score={this.props.players[i].score}
        />
      );
    }

    return items;
  }

  render() {
    return (
      <div className="players-list">
        <h2>Player Scores</h2>
        {this.renderPlayers(this.props.players)}
      </div>
    );
  }
}

export default PlayersList;
