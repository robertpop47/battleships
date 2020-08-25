import React from "react";
import { useSelector } from "react-redux";

export const Cell = (props) => {
  return (
    <div
      style={{ height: "40px", width: "40px", border: "1px solid grey" }}
      content={props.cellType}
    >
      c
    </div>
  );
};
