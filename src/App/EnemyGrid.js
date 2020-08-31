import React, { useState } from "react";
import EnemyCell from "./EnemyCell";
import { useSelector, useDispatch } from "react-redux";
import { placeEnemyShip, getShipCoords } from "./placeOnBoard";
import { updateEnemyShip, setEnemyShip } from "./actions";

const EnemyGrid = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.enemyGameBoard);
  const ships = useSelector((state) => state.enemyShips);
  const currentShip = useSelector((state) => state.enemyCurrentShip);
  const [rotated, setRotated] = useState(false);

  const randomNumber = () => {
    //returns a random integer between 0 and 9
    return Math.floor(Math.random() * 10);
  };

  const randomShips = () => {
    setRotated(Math.floor(Math.random() * 2) === 0 ? false : true);
    if (currentShip < ships.length) {
      const row = randomNumber();
      const col = randomNumber();
      const length = ships[currentShip].size;
      const shipCoords = getShipCoords({ row, col, length, rotated });
      const data = {
        grid,
        row: shipCoords[0][0],
        col: shipCoords[0][1],
        length,
        ships,
        currentShip,
        rotated,
      };
      const gameUpdate = placeEnemyShip(data);
      if (gameUpdate) {
        dispatch(updateEnemyShip(gameUpdate));
        dispatch(setEnemyShip(shipCoords));
      }
    }
  };
  // /*const handleClick = (row, col) => {};
  // handleClick={handleClick}*/
  // if (currentShip < ships.length) {
  //   randomShips();
  // }
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
