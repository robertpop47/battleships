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

export const isSunk = (ship, grid) => {
  // debugger;
  for (let pos of ship.positions) {
    const x = pos.row;
    const y = pos.col;
    if (grid[x][y].status !== "hit") {
      return false;
    }
  }
  return true;
};

const tryGoNorth = (x, y, grid) => {
  // const grid = useSelector((state) => state.yourGameBoard);
  let i = x;
  let j = y;
  while (i >= 0) {
    if (grid[i][j] !== "hit") {
      if (grid[i][j] === "empty" || "occupied") {
        break;
      }
    }
    i--;
  }
  return [i, j];
};
const tryGoSouth = (x, y, grid) => {
  // const grid = useSelector((state) => state.yourGameBoard);
  let i = x;
  let j = y;
  while (i < 9) {
    if (grid[i][j] !== "hit") {
      if (grid[i][j] === "empty" || "occupied") {
        break;
      }
    }
    i++;
  }
  return [i, j];
};
const tryGoWest = (x, y, grid) => {
  // const grid = useSelector((state) => state.yourGameBoard);
  let i = x;
  let j = y;
  while (j >= 0) {
    if (grid[i][j] !== "hit") {
      if (grid[i][j] === "empty" || "occupied") {
        break;
      }
    }
    j--;
  }
  return [i, j];
};
const tryGoEast = (x, y, grid) => {
  // const grid = useSelector((state) => state.yourGameBoard);
  let i = x;
  let j = y;
  while (j < 9) {
    if (grid[i][j] !== "hit") {
      if (grid[i][j] === "empty" || "occupied") {
        break;
      }
    }
    j++;
  }
  return [i, j];
};

const nextRandomMove = (grid) => {
  // const grid = useSelector((state) => state.yourGameBoard);
  let found = false;
  while (!found) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    if (grid[x][y].status === "empty" || grid[x][y].status === "occupied") {
      found = true;
    }
  }
  return [x, y];
};

export const enemyMove = (lastMove, direction, grid) => {
  // const dispatch = useDispatch();
  // const grid = useSelector((state) => state.yourGameBoard);
  const x = lastMove[0];
  const y = lastMove[1];

  let nextDirection = direction;

  if (grid[x][y].status === "hit") {
    let i = x;
    let j = y;
    let counter = 0;
    while (counter < 2) {
      if (nextDirection === "N") {
        const nextCoords = tryGoNorth(i, j, grid);
        i = nextCoords[0];
        j = nextCoords[1];
        if (i === -1) {
          nextDirection = "S";
        } else {
          return [nextCoords, nextDirection];
        }
      }
      if (nextDirection === "S") {
        const nextCoords = tryGoSouth(i, j, grid);
        i = nextCoords[0];
        j = nextCoords[1];
        if (i === 10) {
          nextDirection = "W";
        } else {
          return [nextCoords, nextDirection];
        }
      }
      if (nextDirection === "W") {
        const nextCoords = tryGoWest(i, j, grid);
        i = nextCoords[0];
        j = nextCoords[1];
        if (j === -1) {
          nextDirection = "E";
        } else {
          return [nextCoords, nextDirection];
        }
      }
      if (nextDirection === "E") {
        const nextCoords = tryGoEast(i, j, grid);
        i = nextCoords[0];
        j = nextCoords[1];
        if (j === 10) {
          nextDirection = "N";
          const nextCoords = nextRandomMove(grid);
          return [nextCoords, nextDirection];
        } else {
          return [nextCoords, nextDirection];
        }
      }

      counter++;
    }

    const nextCoords = nextRandomMove(grid);
    const range = Math.floor(Math.random() * 4);
    if (range === 0) {
      nextDirection = "N";
    }
    if (range === 1) {
      nextDirection = "S";
    }
    if (range === 2) {
      nextDirection = "W";
    }
    if (range === 3) {
      nextDirection = "E";
    }
    return [nextCoords, nextDirection];
  } else {
    let i = x;
    let j = y;
    let counter = 0;
    while (counter < 2) {
      if (nextDirection === "N") {
        const nextCoords = tryGoSouth(i, j, grid);
        i = nextCoords[0];
        j = nextCoords[1];
        if (i === -1) {
          nextDirection = "S";
        } else {
          return [nextCoords, nextDirection];
        }
      }
      if (nextDirection === "S") {
        const nextCoords = tryGoNorth(i, j, grid);
        i = nextCoords[0];
        j = nextCoords[1];
        if (i === -1) {
          nextDirection = "N";
        } else {
          return [nextCoords, nextDirection];
        }
      }
      if (nextDirection === "W") {
        const nextCoords = tryGoEast(i, j, grid);
        i = nextCoords[0];
        j = nextCoords[1];
        if (i === -1) {
          nextDirection = "E";
        } else {
          return [nextCoords, nextDirection];
        }
      }
      if (nextDirection === "E") {
        const nextCoords = tryGoWest(i, j, grid);
        i = nextCoords[0];
        j = nextCoords[1];
        if (i === -1) {
          nextDirection = "W";
        } else {
          return [nextCoords, nextDirection];
        }
      }

      counter++;
    }

    const nextCoords = nextRandomMove(grid);
    const range = Math.floor(Math.random() * 4);
    if (range === 0) {
      nextDirection = "N";
    }
    if (range === 1) {
      nextDirection = "S";
    }
    if (range === 2) {
      nextDirection = "W";
    }
    if (range === 3) {
      nextDirection = "E";
    }
    return [nextCoords, nextDirection];
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
