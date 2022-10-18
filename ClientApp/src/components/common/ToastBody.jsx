import React from "react";
import "./ToastBody.css";

const ToastBody = (props) => {
  return (
    <div className="customToastHead">
      <span className="text me-auto">{props.text}</span>
      <button type="button" onClick={props.closeToast} aria-label="Close">
        X
      </button>
    </div>
  );
};

export default ToastBody;
