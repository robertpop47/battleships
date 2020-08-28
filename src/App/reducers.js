import { combineReducers } from "redux";
import { UPDATE_GRID, UPDATE_SHIP } from "./actions";

const boardMargin = {
  0: null,
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
  9: "I",
  10: "J",
};

const initialState = {
  ships: [
    {
      name: "Carrier",
      length: 5,
      positions: [],
    },
    {
      name: "Battleship",
      length: 4,
      positions: [],
    },
    {
      name: "Cruiser",
      length: 3,
      positions: [],
    },
    {
      name: "Submarine",
      length: 3,
      positions: [],
    },
    {
      name: "Destroyer",
      length: 2,
      positions: [],
    },
  ],
  cells: Array(11)
    .fill(null)
    .map((e) => Array(11).fill(null)),
  currentShip: 0,
};

const generateBoard = () => {
  for (let i = 0; i < initialState.cells[0].length; i++) {
    for (let j = 0; j < initialState.cells.length; j++) {
      if (i === 0) {
        initialState.cells[i][j] = { status: "label", label: boardMargin[j] };
      } else if (i !== 0 && j === 0) {
        initialState.cells[i][j] = { status: "label", label: i };
      } else {
        initialState.cells[i][j] = {
          status: "empty",
          hover: false,
          hit: false,
          type: null,
        };
      }
    }
  }
  return [...initialState.cells];
};

const shipList = (state = initialState.ships, action) => {
  // debugger;
  return [...state];
};

const currentShip = (state = initialState.currentShip, action) => {
  if (action.type === UPDATE_SHIP) {
    return state + 1;
  }
  return state;
};

const board = (state = generateBoard(), action) => {
  if (action.type === UPDATE_GRID) {
    // return [...action.board];
    return [...state];
  }
  return [...state];
};

const battleship = combineReducers({
  shipList,
  currentShip,
  board,
});

export default battleship;
