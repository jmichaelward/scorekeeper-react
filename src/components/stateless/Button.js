import React from "react";

const Button = ({ type, label }) => (
  <div className="button-wrap">
    <button type="{ type }">{label}</button>
  </div>
);

export default Button;
