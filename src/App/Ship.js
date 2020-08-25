import React from "react";

export const Ship = (props) => {
  return (
    <div
      style={{
        width: 10 * props.length,
        height: 10,
        border: "1px solid grey",
        backgroundColor: "lightgrey",
        marginBottom: "5px",
      }}
    ></div>
  );
};
