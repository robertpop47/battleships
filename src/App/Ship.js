import React from "react";

export const Ship = (props) => {
  return (
    <div
      style={{
        width: `${20 * props.length}px`,
        height: "20px",
        border: "1px solid grey",
        backgroundColor: "lightgrey",
        marginBottom: "5px",
      }}
    ></div>
  );
};
