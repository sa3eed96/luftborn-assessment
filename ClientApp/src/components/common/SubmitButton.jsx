import React from "react";
import "./SubmitButton.css";

const SubmitButton = ({ text, btnType, ...props }) => {
  const className = `submitButton ${btnType}`;
  return (
    <button
      onClick={props.onClick}
      className={className}
      disabled={props.disabled}
    >
      <span className="text">{text}</span>
      {btnType === "loading" && (
        <div className="spinner-border" role="status"></div>
      )}
    </button>
  );
};

export default SubmitButton;
