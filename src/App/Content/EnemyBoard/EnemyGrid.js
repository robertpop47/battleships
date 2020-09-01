import React from "react";
import EnemyCell from "./EnemyCell";
import { useSelector } from "react-redux";

const EnemyGrid = () => {
  const grid = useSelector((state) => state.enemyGameBoard);

  const cells = grid.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      return (
        <EnemyCell
          key={`${rowIndex}${cellIndex}`}
          value={cell}
          i={rowIndex}
          j={cellIndex}
        />
      );
    });
  });
  return <div className="grid">{cells}</div>;
};
export default EnemyGrid;
