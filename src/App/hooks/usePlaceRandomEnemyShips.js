import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getShipCoords,
  getRandomInteger,
  placeEnemyShip,
} from "../utils/placeOnBoard";
import { updateEnemyShip, setEnemyShip } from "../../redux/actions";

export const usePlaceRandomEnemyShips = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.enemyGameBoard);
  const ships = useSelector((state) => state.enemyShips);
  const currentShip = useSelector((state) => state.enemyCurrentShip);
  const [rotated, setRotated] = useState(false);

  const randomShips = () => {
    setRotated(getRandomInteger(0, 1) === 0 ? false : true);
    if (currentShip < ships.length) {
      const row = getRandomInteger(0, 9);
      const col = getRandomInteger(0, 9);
      const length = ships[currentShip].size;
      const shipCoords = getShipCoords({ row, col, length, rotated });
      const data = {
        grid,
        row: shipCoords[0][0],
        col: shipCoords[0][1],
        length,
        ships,
        currentShip,
        rotated,
      };
      const gameUpdate = placeEnemyShip(data);
      if (gameUpdate) {
        dispatch(updateEnemyShip(gameUpdate));
        dispatch(setEnemyShip(shipCoords));
      }
    }
  };

  if (currentShip < ships.length) {
    randomShips();
  }
};
