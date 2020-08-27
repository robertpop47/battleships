import { combineReducers } from "redux";
import { MOUSE_ENTER, MOUSE_LEAVE } from "./actions";

const shipListState = {
  ships: [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Cruiser", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Destroyer", length: 2 },
  ],
};

const boardState = {
  cells: [
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
    Array(10).fill(null),
  ],
};

const hoveredStade = {
  hovered: [
    Array(10).fill(false),
    Array(10).fill(false),
    Array(10).fill(false),
    Array(10).fill(false),
    Array(10).fill(false),
    Array(10).fill(false),
    Array(10).fill(false),
    Array(10).fill(false),
    Array(10).fill(false),
    Array(10).fill(false),
  ],
};

const cellColorState = {
  color: "white",
};

const shipList = (state = shipListState, action) => {
  // debugger;
  return [...shipListState.ships];
};

const board = (state = boardState, action) => {
  return [...boardState.cells];
};

const hovered = (state = hoveredStade, action) => {
  if (action.type === MOUSE_ENTER) {
    let newHovered = [...hoveredStade.hovered];
    const rowNumber = action.coordinates[0];
    const colNumber = action.coordinates[1];
    // console.log(rowNumber, " ", colNumber);
    newHovered[rowNumber][colNumber] = true;
    return [...newHovered];
  }
  if (action.type === MOUSE_LEAVE) {
    let newHovered = [...hoveredStade.hovered];
    const rowNumber = action.coordinates[0];
    const colNumber = action.coordinates[1];
    // console.log(rowNumber, " ", colNumber);
    newHovered[rowNumber][colNumber] = false;
    return [...newHovered];
  }
  return [...hoveredStade.hovered];
};

const color = (state = cellColorState, action) => {
  if (action.type === MOUSE_ENTER) {
    return { color: "green" };
  }
  if (action.type === MOUSE_LEAVE) {
    return { color: "white" };
  }
  return { color: "white" };
};

const battleship = combineReducers({
  shipList,
  board,
  hovered,
  color,
});

export default battleship;
