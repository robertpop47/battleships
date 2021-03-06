import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { usePlaceRandomEnemyShips } from "../hooks/usePlaceRandomEnemyShips";
import {
  refreshPage,
  // placeRandomEnemyShips,
  isSunk,
} from "../utils/placeOnBoard";
import YourShips from "./YourBoard/YourShips";
import YourGrid from "./YourBoard/YourGrid";
import EnemyShips from "./EnemyBoard/EnemyShips";
import EnemyGrid from "./EnemyBoard/EnemyGrid";
import Numbers from "./BoardMargins/BoardNumbers";
import Letters from "./BoardMargins/BoardLetters";
import clsx from "clsx";

const Content = () => {
  const startBoard = useSelector((state) => state.startBoard);
  const yourTurn = useSelector((state) => state.turn);
  const yourSunkShips = useSelector((state) => state.yourSunkShips);
  const enemySunkShips = useSelector((state) => state.enemySunkShips);
  // const yourShips = useSelector((state) => state.yourShips);
  // const enemyShips = useSelector((state) => state.enemyShips);
  // const yourBoardGame = useSelector((state) => state.yourGameBoard);
  // const enemyBoardGame = useSelector((state) => state.enemyGameBoard);

  // const [youWon, setYouWon] = useState(true);
  // const [enemyWon, setEnemyWon] = useState(true);
  // useEffect(() => {
  //   placeRandomEnemyShips();
  // }, []);
  usePlaceRandomEnemyShips();
  // let youWon = true;
  // let enemyWon = true;
  // if (startBoard) {
  //   for (let ship of yourShips) {
  //     if (!isSunk(ship, yourBoardGame)) {
  //       // youWon = false;
  //       setYouWon(!youWon);
  //     }
  //   }
  //   for (let ship of enemyShips) {
  //     if (!isSunk(ship, enemyBoardGame)) {
  //       // enemyWon = false;
  //       setEnemyWon(!enemyWon);
  //     }
  //   }
  // }
  if (startBoard) {
    if (enemySunkShips === 5) {
      return (
        <div className="endGame">
          <h1>You Won! :) </h1>
          <div className="buttons">
            <a className="refresh" onClick={refreshPage}>
              <img src="../../../img/Icon.svg"></img>
              <div>Reset</div>
            </a>
          </div>
        </div>
      );
    }
    if (yourSunkShips === 5) {
      return (
        <div className="endGame">
          <h1>Enemy Won! :( </h1>
          <div className="buttons">
            <a className="refresh" onClick={refreshPage}>
              <img src="../../../img/Icon.svg"></img>
              <div>Reset</div>
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="startBoard">
        <div
          className={clsx({
            container2: true,
            yourBoard: true,
            disabled: yourTurn,
          })}
        >
          <YourShips />
          <div className="boxBoard">
            <Numbers />
            <div style={{ display: "flex" }}>
              <Letters />
              <YourGrid />
            </div>
          </div>
        </div>
        <div
          className={clsx({
            container2: true,
            enemyBoard: true,
            disabled: !yourTurn,
          })}
        >
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
