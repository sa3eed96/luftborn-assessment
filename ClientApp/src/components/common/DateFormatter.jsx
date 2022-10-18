import React from "react";

const DateFormatter = (props) => {
  return (
    <>
      {new Date(props.date).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </>
  );
};

export default DateFormatter;
