import React, { Component } from "react";
import Player from "./Player";
import "../styles/PlayersList.css";

class PlayersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: this.props.activePlayer
    };
  }

  isActivePlayer(key) {
    return this.state.activePlayer === key;
  }

  render() {
    return (
      <section className="players-list-section" onClick={this.props.callback}>
        <header className="section__hdr">
          <h2 className="h2 section__hd">Player Scores</h2>
        </header>
        <ul className="players-list">
          {this.props.players.map((player, index) => (
            <Player
              key={index}
              playerNumber={player.id}
              name={player.name}
              score={player.score}
              isActive={this.isActivePlayer(index)}
              selectActivePlayer={this.props.selectActivePlayer}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default PlayersList;
