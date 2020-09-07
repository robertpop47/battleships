import React, { useState, useRef } from "react";
import YourCell from "./YourCell";
import { useSelector, useDispatch } from "react-redux";
import {
  placeYourShip,
  getShipCoords,
  enemyMove,
} from "../../utils/placeOnBoard";
import {
  selectYourNextShip,
  removeYourShip,
  setYourShip,
  startGame,
  lastEnemyMove,
} from "../../../redux/actions";

const YourGrid = () => {
  const dispatch = useDispatch();

  const grid = useSelector((state) => state.yourGameBoard);
  const start = useSelector((state) => state.startGame);
  const ships = useSelector((state) => state.yourShips);
  const currentShip = useSelector((state) => state.yourCurrentShip);

  const [rotated, setRotated] = useState(false);
  const lastShipCoords = useRef(null);

  const onMouseLeave = (row, col) => {
    if (currentShip === null) {
      return;
    }
    if (currentShip < ships.length) {
      dispatch(removeYourShip(lastShipCoords.current));
    }
  };
  const onMouseEnter = (row, col) => {
    if (currentShip === null) {
      return;
    }
    if (currentShip < ships.length) {
      const shipData = {
        row,
        col,
        length: ships[currentShip].size,
        rotated,
      };

      lastShipCoords.current = getShipCoords(shipData);
      dispatch(setYourShip(lastShipCoords.current));
    }
  };

  const handleClick = (row, col) => () => {
    if (currentShip === null) {
      return;
    }
    const data = {
      grid,
      row,
      col,
      length: ships[currentShip].size,
      ships,
      currentShip,
      rotated,
    };

    const gameUpdate = placeYourShip(data);
    if (gameUpdate) {
      dispatch(selectYourNextShip(gameUpdate));
    } else {
      return;
    }
    if (currentShip === ships.length - 1) {
      dispatch(startGame(start));
    }
  };

  const handleRotate = () => {
    setRotated(!rotated);
  };

  const cells = grid.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      return (
        <YourCell
          key={`${rowIndex}${cellIndex}`}
          value={cell}
          i={rowIndex}
          j={cellIndex}
          handleRotate={handleRotate}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          handleClick={handleClick(rowIndex, cellIndex)}
        />
      );
    });
  });
  return <div className="grid">{cells}</div>;
};
export default YourGrid;
