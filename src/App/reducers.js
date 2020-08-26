import { combineReducers } from "redux";

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
  hovered: false,
};

const shipList = (state = shipListState, action) => {
  return [...state.ships];
};

const board = (state = boardState, action) => {
  return [...state.cells];
};

const hovered = (state = hoveredStade, action) => {
  return state.hovered;
};

const battleship = combineReducers({
  shipList,
  board,
  hovered,
});

export default battleship;
