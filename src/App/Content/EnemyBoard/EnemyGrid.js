import React from "react";
import EnemyCell from "./EnemyCell";
import { useSelector, useDispatch } from "react-redux";
import { yourMoveHit, yourMoveMiss, setTurn } from "../../../redux/actions";

const EnemyGrid = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.enemyGameBoard);
  const yourTurn = useSelector((state) => state.turn);

  const handleClick = (row, col) => () => {
    if (yourTurn) {
      if (grid[row][col].status === "occupied") {
        dispatch(yourMoveHit(row, col));
      } else {
        dispatch(yourMoveMiss(row, col));
      }
      // dispatch(setTurn(yourTurn));
    }
  };

  const cells = grid.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      return (
        <EnemyCell
          key={`${rowIndex}${cellIndex}`}
          value={cell}
          i={rowIndex}
          j={cellIndex}
          handleClick={handleClick(rowIndex, cellIndex)}
        />
      );
    });
  });
  return <div className="grid">{cells}</div>;
};
export default EnemyGrid;
