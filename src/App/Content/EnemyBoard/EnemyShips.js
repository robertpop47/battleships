import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { enemyShipsSunk } from "../../../redux/actions";
import Ship from "../Ship";
import { isSunk } from "../../utils/placeOnBoard";

const EnemyShips = () => {
  // const dispatch = useDispatch();
  const ships = useSelector((state) => state.enemyShips);
  const board = useSelector((state) => state.enemyGameBoard);
  const enemyCurrentShip = useSelector((state) => state.enemyCurrentShip);

  return (
    <div className="enemyShips">
      <h3>Enemy Ships</h3>
      {ships.map((ship, index) => {
        const shipSunk = isSunk(ships[index], board);

        return (
          <Ship
            ship={ship}
            index={index}
            key={index}
            current={enemyCurrentShip}
            sunk={shipSunk}
          />
        );
      })}
    </div>
  );
};

export default EnemyShips;
