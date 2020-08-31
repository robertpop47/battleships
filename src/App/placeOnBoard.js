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

export const classUpdate = (cell) => {
  let classes = "cell ";
  if (cell.status === "occupied" && cell.hover) {
    classes += "active-occupied ";
  } else if (cell.hover) {
    classes += "active ";
  } else if (cell.status === "occupied") {
    classes += "occupied ";
  } else if (cell.status === "hit") {
    classes += "hit ";
  } else if (cell.status === "sunk") {
    classes += "sunk ";
  }
  return classes;
};
