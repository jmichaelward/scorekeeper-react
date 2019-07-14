import React from "react";

const ResetButton = props => (
  <div className="button-wrap">
    <button onClick={props.handler}>Start Over</button>
  </div>
);

export default ResetButton;
