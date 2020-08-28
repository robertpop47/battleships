import Cell from "./Cell";

const cellOccupied = (board, row, col, ships, currentShip, rotated) => {
  let occupied = false;
  if (rotated) {
    if (row + ships[currentShip].length <= 11) {
      for (let i = 0; i < ships[currentShip].length; i++) {
        if (board[row + i][col].status === "occupied") {
          occupied = true;
        }
      }
    }
  } else {
    if (col + ships[currentShip].length <= 11) {
      for (let i = 0; i < ships[currentShip].length; i++) {
        if (board[row][col + i].status === "occupied") {
          occupied = true;
        }
      }
    }
  }
  return occupied;
};

export const placeShip = ({ board, row, col, ships, currentShip, rotated }) => {
  if (cellOccupied(board, row, col, ships, currentShip, rotated)) {
    return null;
  } else {
    if (rotated) {
      if (row + ships[currentShip].length <= 11) {
        for (let i = 0; i < ships[currentShip].length; i++) {
          board[row + i][col].status = "occupied";
          board[row + i][col].type = "";
          board[row + i][col].hover = false;
          ships[currentShip].positions.push({ row: row + i, col, hit: false });
        }
        return {
          board,
          ships,
        };
      } else {
      }
    } else {
      if (col + ships[currentShip].length <= 11) {
        for (let i = 0; i < ships[currentShip].length; i++) {
          board[row][col + i].status = "occupied";
          board[row][col + i].type = "";
          board[row][col + i].hover = false;
          ships[currentShip].positions.push({ row, col: col + i, hit: false });
        }
        return {
          board,
          ships,
        };
      }
    }
  }
  return null;
};

export const hoverUpdate = ({
  board,
  row,
  col,
  ships,
  currentShip,
  rotated,
  type,
}) => {
  const bool = type === "enter" ? true : false;
  if (rotated) {
    if (row + ships[currentShip].length <= 11) {
      for (let i = 0; i < ships[currentShip].length; i++) {
        board[row + i][col].hover = bool;
      }
    }
  } else {
    if (col + ships[currentShip].length <= 11) {
      for (let i = 0; i < ships[currentShip].length; i++) {
        board[row][col + i].hover = bool;
      }
    }
  }
  return [...board];
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
