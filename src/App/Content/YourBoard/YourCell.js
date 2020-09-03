import React from "react";
import clsx from "clsx";
import { classUpdate } from "../../utils/placeOnBoard";

const YourCell = ({
  value,
  i,
  j,
  handleRotate,
  handleHover,
  handleClick,
  enemyTurn,
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
      onMouseEnter={() => handleHover(i, j, "enter")}
      onMouseLeave={() => handleHover(i, j, "leave")}
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
