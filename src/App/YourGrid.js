import React, { useState, useRef } from "react";
import YourCell from "./YourCell";
import { useSelector, useDispatch } from "react-redux";
import { placeYourShip, getShipCoords } from "./placeOnBoard";
import {
  updateYourShip,
  removeYourShip,
  setYourShip,
  startGame,
} from "./actions";

const YourGrid = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.yourGameBoard);
  const start = useSelector((state) => state.start);
  const ships = useSelector((state) => state.yourShips);
  const currentShip = useSelector((state) => state.yourCurrentShip);
  const [rotated, setRotated] = useState(false);
  const lastShipCoords = useRef(null);
  const handleHover = (row, col, type) => {
    if (currentShip < ships.length) {
      const shipData = {
        row,
        col,
        length: ships[currentShip].size,
        rotated,
      };
      if (type === "leave") {
        dispatch(removeYourShip(lastShipCoords.current));
      } else {
        lastShipCoords.current = getShipCoords(shipData);
        dispatch(setYourShip(lastShipCoords.current));
      }
    }
  };

  const handleClick = (row, col) => {
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
      dispatch(updateYourShip(gameUpdate));
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
          handleHover={handleHover}
          handleClick={handleClick}
        />
      );
    });
  });
  return <div className="grid">{cells}</div>;
};
export default YourGrid;
