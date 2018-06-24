import React, { Component } from "react";
import Button from "./stateless/Button";

class ScoreUpdater extends Component {
  render() {
    return (
      <div className="score-updater">
        <h2>Update Player Score</h2>
        <p>Add to Total</p>
        <input type="num" />
        <Button type="submit" label="Submit" />
      </div>
    );
  }
}

export default ScoreUpdater;
