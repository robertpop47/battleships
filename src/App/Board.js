import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cell from "./Cell";
import { hoverUpdate, placeShip } from "./placeOnBoard";
import { updateGrid, updateShip } from "./actions";

export const Board = (props) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const ships = useSelector((state) => state.shipList);
  const currentShip = useSelector((state) => state.currentShip);
  const [rotated, setRotated] = useState(false);
  const handleHover = (row, col, type) => {
    const hoverProperties = {
      board: board.slice(),
      row,
      col,
      ships,
      currentShip,
      type,
      rotated,
    };
    if (currentShip < ships.length) {
      dispatch(updateGrid(hoverUpdate(hoverProperties)));
    } else {
      alert("START");
    }
  };

  const handleClick = (row, col) => {
    const clickProperties = {
      board: board.slice(),
      row,
      col,
      ships,
      currentShip,
      rotated,
    };

    const gameUpdate = placeShip(clickProperties);
    if (gameUpdate) {
      dispatch(updateGrid(gameUpdate));
      dispatch(updateShip(gameUpdate));
    }
  };

  const handleRotate = () => {
    setRotated(!rotated);
  };

  const cell = board.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      return (
        <Cell
          key={`${rowIndex}${cellIndex}`}
          value={cell}
          i={rowIndex}
          j={cellIndex}
          handleHover={handleHover}
          handleClick={handleClick}
          handleRotate={handleRotate}
        />
      );
    });
  });
  return <div className="board">{cell}</div>;
};
