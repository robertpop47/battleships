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
  yourSunkShips,
  enemySunkShips,
} from "../../../redux/actions";
import { enemyMove, isSunk, AIMove } from "../../utils/placeOnBoard";

const EnemyGrid = () => {
  const dispatch = useDispatch();
  const enemyShips = useSelector((state) => state.enemyShips);
  const yourShips = useSelector((state) => state.yourShips);
  const grid = useSelector((state) => state.enemyGameBoard);
  const yourGrid = useSelector((state) => state.yourGameBoard);
  const yourTurn = useSelector((state) => state.turn);
  const {
    lastEnemyMove: lastEnemyMoveCoords,
    lastEnemyMoveDirection: enemyDirection,
  } = useSelector((state) => state.enemyMove);

  // let enemySunkCounter = 0;
  // for (let ship of enemyShips) {
  //   if (isSunk(ship, grid)) {
  //     enemySunkCounter++;
  //   }
  // }
  // if (enemySunkCounter === 5) {
  //   dispatch(enemySunkShips(enemySunkCounter));
  // }

  // let yourSunkCounter = 0;
  // for (let ship of yourShips) {
  //   if (isSunk(ship, yourGrid)) {
  //     yourSunkCounter++;
  //   }
  // }
  // if (yourSunkCounter === 5) {
  //   dispatch(yourSunkShips(yourSunkCounter));
  // }

  // const isEnemyShipSunk = () => () => {
  // let sunk = Array(ships.length).fill(false);
  // for (let shipIndex in ships) {
  //   if (isSunk(ships[shipIndex], grid)) {
  //     sunk[shipIndex] = true;
  //   }
  // }
  // debugger;
  // dispatch(enemyShipsSunk(sunk));

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
      }
      if (grid[row][col].status === "empty") {
        dispatch(yourMoveMiss(row, col));
      }
      if (
        grid[row][col].status === "hit" ||
        grid[row][col].status === "sunk" ||
        grid[row][col].status === "miss"
      ) {
        return;
      }

      dispatch(setTurn(yourTurn));

      const coords = lastEnemyMoveCoords;
      const direction = enemyDirection;
      const data = AIMove(coords, direction, yourGrid);
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

      setTimeout(() => dispatch(setTurn(yourTurn)), 1000);
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
