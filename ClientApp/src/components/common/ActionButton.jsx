import React from "react";
import "./ActionButton.css";

const ActionButton = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`ActionButton ${props.color}`}
    >
      {props.children}
    </button>
  );
};

export default ActionButton;
