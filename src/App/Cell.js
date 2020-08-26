import React from "react";
import { useSelector } from "react-redux";

export const Cell = ({ val }) => {
  return (
    <div
      className="cell"
      style={{ height: "40px", width: "40px", border: "1px solid grey" }}
    >
      {val}
    </div>
  );
};
