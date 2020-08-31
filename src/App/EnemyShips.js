import React from "react";
import { useSelector } from "react-redux";
import Ship from "./Ship";

const EnemyShips = () => {
  const ships = useSelector((state) => state.enemyShips);
  return (
    <div className="enemyShips">
      <h3>Enemy Ships</h3>
      {ships.map((ship, index) => (
        <Ship ship={ship} index={index} key={index} />
      ))}
    </div>
  );
};

export default EnemyShips;
