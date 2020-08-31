import React from "react";
import { useSelector } from "react-redux";
import YourShips from "./YourShips";
import YourGrid from "./YourGrid";
import EnemyShips from "./EnemyShips";
import EnemyGrid from "./EnemyGrid";
import Numbers from "./BoardNumbers";
import Letters from "./BoardLetters";

const Board = () => {
  const startBoard = useSelector((state) => state.startBoard);
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
export default Board;
