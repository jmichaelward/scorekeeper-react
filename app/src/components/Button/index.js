import React from "react";
import './Button.scss';

const Button = ({ handler, label, wrapClass }) => (
  <div className={wrapClass || "button-wrap"}>
    <button onClick={handler}>{label}</button>
  </div>
);

export default Button;
