import React from "react";
import { classUpdate } from "./placeOnBoard";

const YourCell = ({ value, i, j, handleRotate, handleHover, handleClick }) => {
  return (
    <div
      className={classUpdate(value)}
      onMouseEnter={() => handleHover(i, j, "enter")}
      onMouseLeave={() => handleHover(i, j, "leave")}
      onContextMenu={(e) => {
        e.preventDefault();
        handleRotate();
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleClick(i, j);
      }}
    >
      {value.type}
    </div>
  );
};
export default YourCell;
