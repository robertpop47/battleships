import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEnemyShip, setEnemyShip } from "../../redux/actions";

const isOccupied = (grid, row, col, length, rotated) => {
  let isTaken = false;
  if (rotated) {
    for (let i = 0; i < length; i++) {
      if (grid[row + i][col].status === "occupied") {
        isTaken = true;
      }
    }
  } else {
    for (let i = 0; i < length; i++) {
      if (grid[row][col + i].status === "occupied") {
        isTaken = true;
      }
    }
  }
  return isTaken;
};

export const placeYourShip = ({
  grid,
  row,
  col,
  length,
  ships,
  currentShip,
  rotated,
}) => {
  if (isOccupied(grid, row, col, length, rotated)) {
    return null;
  } else {
    if (rotated) {
      for (let i = 0; i < length; i++) {
        grid[row + i][col].status = "occupied";
        grid[row + i][col].hover = false;
        ships[currentShip].positions.push({ row: row + i, col, hit: false });
      }
    } else {
      for (let i = 0; i < length; i++) {
        grid[row][col + i].status = "occupied";
        grid[row][col + i].hover = false;
        ships[currentShip].positions.push({ row, col: col + i, hit: false });
      }
    }
    return ships;
  }
};

export const placeEnemyShip = ({
  grid,
  row,
  col,
  length,
  ships,
  currentShip,
  rotated,
}) => {
  if (isOccupied(grid, row, col, length, rotated)) {
    return null;
  } else {
    if (rotated) {
      for (let i = 0; i < length; i++) {
        ships[currentShip].positions.push({ row: row + i, col, hit: false });
      }
    } else {
      for (let i = 0; i < length; i++) {
        ships[currentShip].positions.push({ row, col: col + i, hit: false });
      }
    }
    return ships;
  }
};

export const getShipCoords = ({ row, col, length, rotated }) => {
  return Array(length)
    .fill([row, col])
    .map(([row, col], index) => {
      if (rotated) {
        if (row + length <= 10) {
          return [row + index, col];
        } else {
          return [10 - length + index, col];
        }
      } else {
        if (col + length <= 10) {
          return [row, col + index];
        } else {
          return [row, 10 - length + index];
        }
      }
    });
};

export const placeRandomEnemyShips = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.enemyGameBoard);
  const ships = useSelector((state) => state.enemyShips);
  const currentShip = useSelector((state) => state.enemyCurrentShip);
  const [rotated, setRotated] = useState(false);

  const randomNum = () => {
    return Math.floor(Math.random() * 10);
  };

  const randomShips = () => {
    setRotated(Math.floor(Math.random() * 2) === 0 ? false : true);
    if (currentShip < ships.length) {
      const row = randomNum();
      const col = randomNum();
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

// export const classUpdate = (cell) => {
//   let classes = "cell ";
//   if (cell.status === "occupied" && cell.hover) {
//     classes += "active-occupied ";
//   } else if (cell.hover) {
//     classes += "active ";
//   } else if (cell.status === "occupied") {
//     classes += "occupied ";
//   } else if (cell.status === "hit") {
//     classes += "hit ";
//   } else if (cell.status === "sunk") {
//     classes += "sunk ";
//   }
//   return classes;
// };
