import React, { Component } from "react";
import Game from "./components/Game";

class App extends Component {
  state = {
    players: {}
  };

  render() {
    return <Game players={this.props.players} />;
  }
}

export default App;
