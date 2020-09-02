import React from "react";
import clsx from "clsx";
import { classUpdate } from "../../utils/placeOnBoard";

const EnemyCell = ({ value, i, j, handleClick }) => {
  return (
    <div
      className={clsx({
        cell: true,
        active: value.hover,
        // activeOcupied: value.status === "occupied" && value.hover,
        // occupied: value.status === "occupied",
        hit: value.status === "hit",
        sunk: value.status === "sunk",
        miss: value.status === "miss",
        ///classes setters from placeOnBoard
      })} /*classUpdate(value)*/
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleClick();
      }}
    >
      {
        // value.type
      }
    </div>
  );
};
export default EnemyCell;
