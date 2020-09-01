import React from "react";
import { useSelector } from "react-redux";
import { placeRandomEnemyShips } from "../utils/placeOnBoard";
import YourShips from "./YourBoard/YourShips";
import YourGrid from "./YourBoard/YourGrid";
import EnemyShips from "./EnemyBoard/EnemyShips";
import EnemyGrid from "./EnemyBoard/EnemyGrid";
import Numbers from "./BoardMargins/BoardNumbers";
import Letters from "./BoardMargins/BoardLetters";

const Content = () => {
  const startBoard = useSelector((state) => state.startBoard);

  placeRandomEnemyShips();

  return (
    <div>
      {startBoard === true ? (
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
      ) : (
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
      )}
    </div>
  );
};
export default Content;
