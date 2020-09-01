import React from "react";
import { useSelector } from "react-redux";
import Ship from "../Ship";

const YourShips = () => {
  const ships = useSelector((state) => state.yourShips);
  return (
    <div className="yourShips">
      <h3>Your Ships</h3>
      {ships.map((ship, index) => (
        <Ship ship={ship} index={index} key={index} />
      ))}
    </div>
  );
};

export default YourShips;
