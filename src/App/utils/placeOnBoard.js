export const refreshPage = () => {
  window.location.reload(false);
};

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

export const isSunk = (ship, grid) => {
  // debugger;
  let isAllHit = true;
  let isAllSunk = true;
  for (let pos of ship.positions) {
    const x = pos.row;
    const y = pos.col;
    if (grid[x][y].status !== "hit") {
      isAllHit = false;
    }
    if (grid[x][y].status !== "sunk") {
      isAllSunk = false;
    }
  }
  return isAllHit || isAllSunk;
};

const tryGoNorth = (x, y, grid) => {
  // const grid = useSelector((state) => state.yourGameBoard);
  let i = x - 1;
  let j = y;
  while (i >= 0) {
    if (grid[i][j].status === "empty" || grid[i][j].status === "occupied") {
      return [i, j];
    }
    if (grid[i][j].status === "miss" || grid[i][j].status === "sunk") {
      return null;
    }
    i--;
  }
  return null;
};
const tryGoSouth = (x, y, grid) => {
  // const grid = useSelector((state) => state.yourGameBoard);
  let i = x + 1;
  let j = y;
  while (i <= 9) {
    if (grid[i][j].status === "empty" || grid[i][j].status === "occupied") {
      return [i, j];
    }
    if (grid[i][j].status === "miss" || grid[i][j].status === "sunk") {
      return null;
    }

    i++;
  }
  return null;
};
const tryGoWest = (x, y, grid) => {
  // const grid = useSelector((state) => state.yourGameBoard);
  let i = x;
  let j = y - 1;
  while (j >= 0) {
    if (grid[i][j].status === "empty" || grid[i][j].status === "occupied") {
      return [i, j];
    }
    if (grid[i][j].status === "miss" || grid[i][j].status === "sunk") {
      return null;
    }

    j--;
  }
  return null;
};
const tryGoEast = (x, y, grid) => {
  // const grid = useSelector((state) => state.yourGameBoard);
  let i = x;
  let j = y + 1;
  while (j <= 9) {
    if (grid[i][j].status === "empty" || grid[i][j].status === "occupied") {
      return [i, j];
    }
    if (grid[i][j].status === "miss" || grid[i][j].status === "sunk") {
      return null;
    }

    j++;
  }
  return null;
};

const nextRandomMove = (grid) => {
  // const grid = useSelector((state) => state.yourGameBoard);
  let found = false;
  let i = 0;
  let j = 0;
  while (!found) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    if (grid[x][y].status === "empty" || grid[x][y].status === "occupied") {
      found = true;
      i = x;
      j = y;
    }
  }
  return [i, j];
};

const getFirstHitCell = (grid) => {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y].status === "hit") {
        return [x, y];
      }
    }
  }
  return null;
};

export const AIMove = (lastMove, direction, grid) => {
  const x = lastMove[0];
  const y = lastMove[1];

  let nextDirection = direction;

  if (
    grid[x][y].status !== "hit" &&
    grid[x][y].status !== "sunk" &&
    grid[x][y].status !== "miss"
  ) {
    const move = nextRandomMove(grid);
    nextDirection = "rand";
    return [move, nextDirection];
  }
  if (grid[x][y].status === "hit") {
    if (nextDirection === "rand") {
      if (
        x >= 1 &&
        (grid[x - 1][y].status === "empty" ||
          grid[x - 1][y].status === "occupied")
      ) {
        const move = [x - 1, y];
        nextDirection = "N";
        return [move, nextDirection];
      }
      if (
        x <= 8 &&
        (grid[x + 1][y].status === "empty" ||
          grid[x + 1][y].status === "occupied")
      ) {
        const move = [x + 1, y];
        nextDirection = "S";
        return [move, nextDirection];
      }
      if (
        y <= 8 &&
        (grid[x][y + 1].status === "empty" ||
          grid[x][y + 1].status === "occupied")
      ) {
        const move = [x, y + 1];
        nextDirection = "E";
        return [move, nextDirection];
      }
      if (
        y >= 1 &&
        (grid[x][y - 1].status === "empty" ||
          grid[x][y - 1].status === "occupied")
      ) {
        const move = [x, y - 1];
        nextDirection = "W";
        return [move, nextDirection];
      }
    }
    if (nextDirection === "N") {
      if (
        x >= 1 &&
        (grid[x - 1][y].status === "empty" ||
          grid[x - 1][y].status === "occupied")
      ) {
        const move = [x - 1, y];
        nextDirection = "N";
        return [move, nextDirection];
      } else {
        const move = tryGoSouth(x, y, grid);
        if (move !== null) {
          nextDirection = "S";
          return [move, nextDirection];
        }
      }
    }
    if (nextDirection === "S") {
      if (
        x <= 8 &&
        (grid[x + 1][y].status === "empty" ||
          grid[x + 1][y].status === "occupied")
      ) {
        const move = [x + 1, y];
        nextDirection = "S";
        return [move, nextDirection];
      } else {
        const move = tryGoNorth(x, y, grid);
        if (move !== null) {
          nextDirection = "N";
          return [move, nextDirection];
        }
      }
    }
    if (nextDirection === "E") {
      if (
        y <= 8 &&
        (grid[x][y + 1].status === "empty" ||
          grid[x][y + 1].status === "occupied")
      ) {
        const move = [x, y + 1];
        nextDirection = "E";
        return [move, nextDirection];
      } else {
        const move = tryGoWest(x, y, grid);
        if (move !== null) {
          nextDirection = "W";
          return [move, nextDirection];
        }
      }
    }
    if (nextDirection === "W") {
      if (
        y >= 1 &&
        (grid[x][y - 1].status === "empty" ||
          grid[x][y - 1].status === "occupied")
      ) {
        const move = [x, y - 1];
        nextDirection = "W";
        return [move, nextDirection];
      } else {
        const move = tryGoEast(x, y, grid);
        if (move !== null) {
          nextDirection = "E";
          return [move, nextDirection];
        }
      }
    }

    const firstHitCellCoords = getFirstHitCell(grid);
    if (firstHitCellCoords !== null) {
      const [x, y] = firstHitCellCoords;
      if (x >= 1 && grid[x - 1][y].status === "hit") {
        const move = tryGoNorth(x - 1, y, grid);
        if (move !== null) {
          nextDirection = "N";
          return [move, nextDirection];
        } else {
          const move = tryGoSouth(x, y, grid);
          if (move !== null) {
            nextDirection = "S";
            return [move, nextDirection];
          }
        }
      }
      if (x <= 8 && grid[x + 1][y].status === "hit") {
        const move = tryGoSouth(x + 1, y, grid);
        if (move !== null) {
          nextDirection = "S";
          return [move, nextDirection];
        } else {
          const move = tryGoNorth(x, y, grid);
          if (move !== null) {
            nextDirection = "N";
            return [move, nextDirection];
          }
        }
      }
      if (y >= 1 && grid[x][y - 1].status === "hit") {
        const move = tryGoWest(x, y - 1, grid);
        if (move !== null) {
          nextDirection = "W";
          return [move, nextDirection];
        } else {
          const move = tryGoEast(x, y, grid);
          if (move !== null) {
            nextDirection = "E";
            return [move, nextDirection];
          }
        }
      }
      if (y <= 8 && grid[x][y + 1].status === "hit") {
        const move = tryGoEast(x, y + 1, grid);
        if (move !== null) {
          nextDirection = "E";
          return [move, nextDirection];
        } else {
          const move = tryGoWest(x, y, grid);
          if (move !== null) {
            nextDirection = "W";
            return [move, nextDirection];
          }
        }
      }
    }

    const randMove = nextRandomMove(grid);
    nextDirection = "rand";
    return [randMove, nextDirection];
  }
  if (grid[x][y].status === "sunk") {
    const firstHitCellCoords = getFirstHitCell(grid);
    if (firstHitCellCoords !== null) {
      const [x, y] = firstHitCellCoords;
      if (x >= 1 && grid[x - 1][y].status === "hit") {
        const move = tryGoNorth(x - 1, y, grid);
        if (move !== null) {
          nextDirection = "N";
          return [move, nextDirection];
        } else {
          const move = tryGoSouth(x, y, grid);
          if (move !== null) {
            nextDirection = "S";
            return [move, nextDirection];
          }
        }
      }
      if (x <= 8 && grid[x + 1][y].status === "hit") {
        const move = tryGoSouth(x + 1, y, grid);
        if (move !== null) {
          nextDirection = "S";
          return [move, nextDirection];
        } else {
          const move = tryGoNorth(x, y, grid);
          if (move !== null) {
            nextDirection = "N";
            return [move, nextDirection];
          }
        }
      }
      if (y >= 1 && grid[x][y - 1].status === "hit") {
        const move = tryGoWest(x, y - 1, grid);
        if (move !== null) {
          nextDirection = "W";
          return [move, nextDirection];
        } else {
          const move = tryGoEast(x, y, grid);
          if (move !== null) {
            nextDirection = "E";
            return [move, nextDirection];
          }
        }
      }
      if (y <= 8 && grid[x][y + 1].status === "hit") {
        const move = tryGoEast(x, y + 1, grid);
        if (move !== null) {
          nextDirection = "E";
          return [move, nextDirection];
        } else {
          const move = tryGoWest(x, y, grid);
          if (move !== null) {
            nextDirection = "W";
            return [move, nextDirection];
          }
        }
      }
      if (
        (x >= 1 && grid[x - 1][y].status === "empty") ||
        (x >= 1 && grid[x - 1][y].status === "occupied")
      ) {
        const move = [x - 1, y];
        nextDirection = "N";
        return [move, nextDirection];
      }
      if (
        (x <= 8 && grid[x + 1][y].status === "empty") ||
        (x <= 8 && grid[x + 1][y].status === "occupied")
      ) {
        const move = [x + 1, y];
        nextDirection = "S";
        return [move, nextDirection];
      }
      if (
        (y >= 1 && grid[x][y - 1].status === "empty") ||
        (y >= 1 && grid[x][y - 1].status === "occupied")
      ) {
        const move = [x, y - 1];
        nextDirection = "W";
        return [move, nextDirection];
      }
      if (
        (y <= 8 && grid[x][y + 1].status === "empty") ||
        (y <= 8 && grid[x][y + 1].status === "occupied")
      ) {
        const move = [x, y + 1];
        nextDirection = "E";
        return [move, nextDirection];
      }
    }

    const randMove = nextRandomMove(grid);
    nextDirection = "rand";
    return [randMove, nextDirection];
  }
  if (grid[x][y].status === "miss") {
    if (nextDirection === "rand") {
      const firstHitCellCoords = getFirstHitCell(grid);
      if (firstHitCellCoords !== null) {
        const [x, y] = firstHitCellCoords;
        if (x >= 1 && grid[x - 1][y].status === "hit") {
          const move = tryGoNorth(x - 1, y, grid);
          if (move !== null) {
            nextDirection = "N";
            return [move, nextDirection];
          } else {
            const move = tryGoSouth(x, y, grid);
            if (move !== null) {
              nextDirection = "S";
              return [move, nextDirection];
            }
          }
        }
        if (x <= 8 && grid[x + 1][y].status === "hit") {
          const move = tryGoSouth(x + 1, y, grid);
          if (move !== null) {
            nextDirection = "S";
            return [move, nextDirection];
          } else {
            const move = tryGoNorth(x, y, grid);
            if (move !== null) {
              nextDirection = "N";
              return [move, nextDirection];
            }
          }
        }
        if (y >= 1 && grid[x][y - 1].status === "hit") {
          const move = tryGoWest(x, y - 1, grid);
          if (move !== null) {
            nextDirection = "W";
            return [move, nextDirection];
          } else {
            const move = tryGoEast(x, y, grid);
            if (move !== null) {
              nextDirection = "E";
              return [move, nextDirection];
            }
          }
        }
        if (y <= 8 && grid[x][y + 1].status === "hit") {
          const move = tryGoEast(x, y + 1, grid);
          if (move !== null) {
            nextDirection = "E";
            return [move, nextDirection];
          } else {
            const move = tryGoWest(x, y, grid);
            if (move !== null) {
              nextDirection = "W";
              return [move, nextDirection];
            }
          }
        }
      }

      const randMove = nextRandomMove(grid);
      nextDirection = "rand";
      return [randMove, nextDirection];
    }
    if (nextDirection === "N") {
      const move = tryGoSouth(x, y, grid);
      if (move !== null) {
        nextDirection = "S";
        return [move, nextDirection];
      }
    }
    if (nextDirection === "S") {
      const move = tryGoNorth(x, y, grid);
      if (move !== null) {
        nextDirection = "N";
        return [move, nextDirection];
      }
    }
    if (nextDirection === "W") {
      const move = tryGoEast(x, y, grid);
      if (move !== null) {
        nextDirection = "W";
        return [move, nextDirection];
      }
    }
    if (nextDirection === "E") {
      const move = tryGoWest(x, y, grid);
      if (move !== null) {
        nextDirection = "E";
        return [move, nextDirection];
      }
    }

    const firstHitCellCoords = getFirstHitCell(grid);
    if (firstHitCellCoords !== null) {
      const [x, y] = firstHitCellCoords;
      if (x >= 1 && grid[x - 1][y].status === "hit") {
        const move = tryGoNorth(x - 1, y, grid);
        if (move !== null) {
          nextDirection = "N";
          return [move, nextDirection];
        } else {
          const move = tryGoSouth(x, y, grid);
          if (move !== null) {
            nextDirection = "S";
            return [move, nextDirection];
          }
        }
      }
      if (x <= 8 && grid[x + 1][y].status === "hit") {
        const move = tryGoSouth(x + 1, y, grid);
        if (move !== null) {
          nextDirection = "S";
          return [move, nextDirection];
        } else {
          const move = tryGoNorth(x, y, grid);
          if (move !== null) {
            nextDirection = "N";
            return [move, nextDirection];
          }
        }
      }
      if (y >= 1 && grid[x][y - 1].status === "hit") {
        const move = tryGoWest(x, y - 1, grid);
        if (move !== null) {
          nextDirection = "W";
          return [move, nextDirection];
        } else {
          const move = tryGoEast(x, y, grid);
          if (move !== null) {
            nextDirection = "E";
            return [move, nextDirection];
          }
        }
      }
      if (y <= 8 && grid[x][y + 1].status === "hit") {
        const move = tryGoEast(x, y + 1, grid);
        if (move !== null) {
          nextDirection = "E";
          return [move, nextDirection];
        } else {
          const move = tryGoWest(x, y, grid);
          if (move !== null) {
            nextDirection = "W";
            return [move, nextDirection];
          }
        }
      }
      if (
        (x >= 1 && grid[x - 1][y].status === "empty") ||
        (x >= 1 && grid[x - 1][y].status === "occupied")
      ) {
        const move = [x - 1, y];
        nextDirection = "N";
        return [move, nextDirection];
      }
      if (
        (x <= 8 && grid[x + 1][y].status === "empty") ||
        (x <= 8 && grid[x + 1][y].status === "occupied")
      ) {
        const move = [x + 1, y];
        nextDirection = "S";
        return [move, nextDirection];
      }
      if (
        (y >= 1 && grid[x][y - 1].status === "empty") ||
        (y >= 1 && grid[x][y - 1].status === "occupied")
      ) {
        const move = [x, y - 1];
        nextDirection = "W";
        return [move, nextDirection];
      }
      if (
        (y <= 8 && grid[x][y + 1].status === "empty") ||
        (y <= 8 && grid[x][y + 1].status === "occupied")
      ) {
        const move = [x, y + 1];
        nextDirection = "E";
        return [move, nextDirection];
      }
    }

    const randMove = nextRandomMove(grid);
    nextDirection = "rand";
    return [randMove, nextDirection];
  }
};

export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
