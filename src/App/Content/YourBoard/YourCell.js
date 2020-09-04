import React from "react";
import clsx from "clsx";
import { classUpdate } from "../../utils/placeOnBoard";

const YourCell = ({
  value,
  i,
  j,
  handleRotate,
  onMouseEnter,
  onMouseLeave,
  handleClick,
  // enemyTurn,
}) => {
  return (
    <div
      className={clsx({
        cell: true,
        active: value.hover,
        activeOcupied: value.status === "occupied" && value.hover,
        occupied: value.status === "occupied",
        hit: value.status === "hit",
        miss: value.status === "miss",
        sunk: value.status === "sunk",
        ///classes setters from placeOnBoard
      })}
      onMouseEnter={() => onMouseEnter(i, j)}
      onMouseLeave={() => onMouseLeave(i, j)}
      onContextMenu={(e) => {
        e.preventDefault();
        handleRotate();
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleClick();
      }}
    ></div>
  );
};

export default YourCell;
