import React from "react";
import { useSelector } from "react-redux";
import Ship from "../Ship";
import { isSunk } from "../../utils/placeOnBoard";

const EnemyShips = () => {
  const ships = useSelector((state) => state.enemyShips);
  const board = useSelector((state) => state.enemyGameBoard);
  return (
    <div className="enemyShips">
      <h3>Enemy Ships</h3>
      {ships.map((ship, index) => (
        <Ship
          ship={ship}
          index={index}
          key={index}
          sunk={isSunk(ships[index], board)}
        />
      ))}
    </div>
  );
};

export default EnemyShips;
