import React from "react";
import "./CheckBox.css";

const CustomCheckBox = (props) => {
  return (
    <span
      onClick={props.toggleCheck}
      className={props.checked ? "customCheckBox checked" : "customCheckBox"}
    ></span>
  );
};

export default CustomCheckBox;
