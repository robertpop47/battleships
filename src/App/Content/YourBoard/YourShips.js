import React from "react";
import { useSelector } from "react-redux";
import Ship from "../Ship";
import { isSunk } from "../../utils/placeOnBoard";

const YourShips = () => {
  const ships = useSelector((state) => state.yourShips);
  const board = useSelector((state) => state.yourGameBoard);
  const yourCurrentShip = useSelector((state) => state.yourCurrentShip);
  // const isShipSunk = (index) => {
  //   if (isSunk(ships[index], board)) {
  //     return [true, index];
  //   }
  //   return [false, index];
  // };

  return (
    <div className="yourShips">
      <h3>Your Ships</h3>
      {ships.map((ship, index) => (
        <Ship
          ship={ship}
          index={index}
          key={index}
          current={yourCurrentShip}
          sunk={isSunk(ship, board)}
        />
      ))}
    </div>
  );
};

export default YourShips;
