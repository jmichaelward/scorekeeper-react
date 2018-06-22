import React, { Component } from "react";
import Header from "./components/Header";
import Router from "./components/Router";

class App extends Component {
  state = {
    players: {}
  };

  render() {
    return (
      <div className="scorekeeper">
        <Header title="Scorekeeper" />
        <Router />
      </div>
    );
  }
}

export default App;
