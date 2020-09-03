import React from "react";
import EnemyCell from "./EnemyCell";
import { useSelector, useDispatch } from "react-redux";
import {
  yourMoveHit,
  yourMoveMiss,
  enemyMoveHit,
  enemyMoveMiss,
  setTurn,
  lastEnemyMove,
} from "../../../redux/actions";
import { enemyMove } from "../../utils/placeOnBoard";
import YourGrid from "../YourBoard/YourGrid";

const EnemyGrid = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.enemyGameBoard);
  const yourGrid = useSelector((state) => state.yourGameBoard);
  const yourTurn = useSelector((state) => state.turn);
  const {
    lastEnemyMove: lastEnemyMoveCoords,
    lastEnemyMoveDirection: enemyDirection,
  } = useSelector((state) => state.enemyMove);
  // const { lastEnemyMoveCoords, enemyDirection } = lastEnemyMoveData;

  // const enemyTurn = () => () => {
  //   if (!yourTurn) {
  //     dispatch(lastEnemyMove(coords, direction));
  //     if (yourGrid[row][col].status === "occupied") {
  //       dispatch(yourMoveHit(row, col));
  //     } else {
  //       dispatch(yourMoveMiss(row, col));
  //     }
  //     dispatch(setTurn(yourTurn));
  //   }
  // };

  const handleClick = (row, col) => () => {
    // debugger;

    if (yourTurn) {
      if (grid[row][col].status === "occupied") {
        dispatch(yourMoveHit(row, col));
      } else {
        dispatch(yourMoveMiss(row, col));
      }
      dispatch(setTurn(yourTurn));

      const coords = lastEnemyMoveCoords;
      const direction = enemyDirection;
      const data = enemyMove(coords, direction, yourGrid);
      const i = data[0][0];
      const j = data[0][1];

      dispatch(lastEnemyMove([i, j], data[1]));
      if (
        yourGrid[i][j].status === "occupied" ||
        yourGrid[i][j].status === "hit"
      ) {
        dispatch(enemyMoveHit(i, j));
      } else {
        dispatch(enemyMoveMiss(i, j));
      }
      dispatch(setTurn(yourTurn));
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
