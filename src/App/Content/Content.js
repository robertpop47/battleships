import React from "react";
import { useSelector } from "react-redux";
import {
  refreshPage,
  placeRandomEnemyShips,
  isSunk,
} from "../utils/placeOnBoard";
import YourShips from "./YourBoard/YourShips";
import YourGrid from "./YourBoard/YourGrid";
import EnemyShips from "./EnemyBoard/EnemyShips";
import EnemyGrid from "./EnemyBoard/EnemyGrid";
import Numbers from "./BoardMargins/BoardNumbers";
import Letters from "./BoardMargins/BoardLetters";

const Content = () => {
  const startBoard = useSelector((state) => state.startBoard);
  const yourShips = useSelector((state) => state.yourShips);
  const enemyShips = useSelector((state) => state.enemyShips);
  const yourBoardGame = useSelector((state) => state.yourGameBoard);
  const enemyBoardGame = useSelector((state) => state.enemyGameBoard);
  placeRandomEnemyShips();

  let youWon = true;
  let enemyWon = true;
  for (let ship of yourShips) {
    if (!isSunk(ship, yourBoardGame)) {
      youWon = false;
    }
  }
  for (let ship of enemyShips) {
    if (!isSunk(ship, enemyBoardGame)) {
      enemyWon = false;
    }
  }

  if (startBoard) {
    if (youWon) {
      return (
        <div>
          <h1>You Won! :) </h1>
          <div className="buttons">
            <button onClick={refreshPage}>RESET</button>
          </div>
        </div>
      );
    }
    if (enemyWon) {
      return (
        <div>
          <h1>Enemy Won! :( </h1>
          <div className="buttons">
            <button onClick={refreshPage}>RESET</button>
          </div>
        </div>
      );
    }

    return (
      <div className="startBoard">
        <div className="container2">
          <YourShips />
          <div className="boxBoard">
            <Numbers />
            <div style={{ display: "flex" }}>
              <Letters />
              <YourGrid />
            </div>
          </div>
        </div>
        <div className="container2">
          <div className="boxBoard">
            <Numbers />
            <div style={{ display: "flex" }}>
              <Letters />
              <EnemyGrid />
            </div>
          </div>
          <EnemyShips />
        </div>
      </div>
    );
  }

  return (
    <div className="container1">
      <YourShips />
      <div className="boxBoard">
        <Numbers />
        <div style={{ display: "flex" }}>
          <Letters />
          <YourGrid />
        </div>
      </div>
    </div>
  );
};
export default Content;
