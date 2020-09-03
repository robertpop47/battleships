import React from "react";
import EnemyCell from "./EnemyCell";
import { useSelector, useDispatch } from "react-redux";
import {
  yourMoveHit,
  yourMoveMiss,
  setTurn,
  lastEnemyMove,
} from "../../../redux/actions";
import { enemyMove } from "../../utils/placeOnBoard";

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
  const [coords, direction] = enemyMove(lastEnemyMoveCoords, enemyDirection);

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
    const i = coords[0];
    const j = coords[1];

    if (yourTurn) {
      if (grid[row][col].status === "occupied") {
        dispatch(yourMoveHit(row, col));
      } else {
        dispatch(yourMoveMiss(row, col));
      }
      dispatch(setTurn(yourTurn));
      dispatch(lastEnemyMove(coords, direction));
      if (yourGrid[i][j].status === "occupied") {
        dispatch(yourMoveHit(i, j));
      } else {
        dispatch(yourMoveMiss(i, j));
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
