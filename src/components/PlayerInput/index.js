import React from "react";

export const getInitialPlayerValue = (id) => {
  return {id, name: '', score: 0, isActive: false }
};

const PlayerInput = (props) => {
  const { id, name } = props;
  const updateInputValue = event => {
    props.updateName(id, event.target.value);
  }

  return (
    <input
      className="players-form__name-input"
      name={name}
      type="text"
      key={id}
      id={id}
      required
      placeholder="Player name"
      onChange={updateInputValue}
    />
  );
}

export default PlayerInput;
