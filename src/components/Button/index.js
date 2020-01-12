import React from "react";
import './Button.scss';

const Button = ({ handler, label }) => (
  <div className="button-wrap">
    <button onClick={handler}>{label}</button>
  </div>
);

export default Button;
