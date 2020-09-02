import { combineReducers } from "redux";
import {
  UPDATE_YOUR_SHIP,
  UPDATE_ENEMY_SHIP,
  REMOVE_YOUR_SHIP,
  SET_ENEMY_SHIP,
  SET_YOUR_SHIP,
  START_GAME,
  START_BOARD,
  YOUR_MOVE_HIT,
  YOUR_MOVE_MISS,
  SET_TURN,
  ENEMY_MOVE_HIT,
  ENEMY_MOVE_MISS,
} from "./actions";

const initialState = {
  yourShipList: [
    {
      name: "Carrier",
      size: 5,
      positions: [],
    },
    {
      name: "Battleship",
      size: 4,
      positions: [],
    },
    {
      name: "Destroyer",
      size: 3,
      positions: [],
    },
    {
      name: "Submarine",
      size: 3,
      positions: [],
    },
    {
      name: "Patrol Boat",
      size: 2,
      positions: [],
    },
  ],
  enemyShipList: [
    {
      name: "Carrier",
      size: 5,
      positions: [],
    },
    {
      name: "Battleship",
      size: 4,
      positions: [],
    },
    {
      name: "Destroyer",
      size: 3,
      positions: [],
    },
    {
      name: "Submarine",
      size: 3,
      positions: [],
    },
    {
      name: "Patrol Boat",
      size: 2,
      positions: [],
    },
  ],
  yourGameBoard: Array(10)
    .fill(null)
    .map((x) =>
      Array(10).fill({
        status: "empty",
        hover: false,
        hit: false,
      })
    ),
  enemyGameBoard: Array(10)
    .fill(null)
    .map((x) =>
      Array(10).fill({
        status: "empty",
        hover: false,
        hit: false,
      })
    ),
  yourCurrentShip: 0,
  enemyCurrentShip: 0,
  showStartGame: false,
  showGameBoard: false,
  yourTurn: true,
};

// placeRandomEnemyShips();

const startGame = (state = initialState.showStartGame, action) => {
  if (action.type === START_GAME) {
    state = true;
  }
  // if (action.type === RESET_GAME) {
  //   return initialState.showStartGame;
  // }
  return state;
};

const startBoard = (state = initialState.showGameBoard, action) => {
  if (action.type === START_BOARD) {
    state = true;
  }
  // if (action.type === RESET_GAME) {
  //   return initialState.showGameBoard;
  // }
  return state;
};

const yourShips = (state = initialState.yourShipList, action) => {
  // if (action.type === RESET_GAME) {
  //   return [...initialState.yourShipList];
  // }
  return [...state];
};

const enemyShips = (state = initialState.enemyShipList, action) => {
  return state;
};

const yourCurrentShip = (state = initialState.yourCurrentShip, action) => {
  if (action.type === UPDATE_YOUR_SHIP) {
    return state + 1;
  }
  // if (action.type === RESET_GAME) {
  //   return initialState.yourCurrentShip;
  // }
  return state;
};

const enemyCurrentShip = (state = initialState.enemyCurrentShip, action) => {
  if (action.type === UPDATE_ENEMY_SHIP) {
    return state + 1;
  }
  return state;
};

const yourGameBoard = (state = initialState.yourGameBoard, action) => {
  if (action.type === SET_YOUR_SHIP) {
    const newGameBoard = [...state];
    const { newCoordinates } = action.payload;
    newCoordinates.forEach(([x, y]) => {
      newGameBoard[x][y] = { ...newGameBoard[x][y], hover: true };
    });
    return newGameBoard;
  }
  if (action.type === REMOVE_YOUR_SHIP) {
    const newGameBoard = [...state];
    const { shipCoordinates } = action.payload;
    shipCoordinates.forEach(([x, y]) => {
      newGameBoard[x][y] = { ...newGameBoard[x][y], hover: false };
    });
    return newGameBoard;
  }
  if (action.type === ENEMY_MOVE_HIT) {
    const newGameBoard = [...state];
    const { x, y } = action.payload;
    newGameBoard[x][y] = { ...newGameBoard[x][y], status: "hit" };
    return newGameBoard;
  }
  if (action.type === ENEMY_MOVE_MISS) {
    const newGameBoard = [...state];
    const { x, y } = action.payload;
    newGameBoard[x][y] = { ...newGameBoard[x][y], status: "miss" };
    return newGameBoard;
  }
  // if (action.type === RESET_GAME) {
  //   return [...initialState.yourGameBoard];
  // }
  return [...state];
};

const enemyGameBoard = (state = initialState.enemyGameBoard, action) => {
  if (action.type === SET_ENEMY_SHIP) {
    const newGameBoard = [...state];
    const { newCoordinates } = action.payload;
    newCoordinates.forEach(([x, y]) => {
      newGameBoard[x][y] = { ...newGameBoard[x][y], status: "occupied" };
    });
    return newGameBoard;
  }
  if (action.type === YOUR_MOVE_HIT) {
    const newGameBoard = [...state];
    const { x, y } = action.payload;
    newGameBoard[x][y] = { ...newGameBoard[x][y], status: "hit" };
    return newGameBoard;
  }
  if (action.type === YOUR_MOVE_MISS) {
    const newGameBoard = [...state];
    const { x, y } = action.payload;
    newGameBoard[x][y] = { ...newGameBoard[x][y], status: "miss" };
    return newGameBoard;
  }
  return [...state];
};

const turn = (state = initialState.yourTurn, action) => {
  if (action.type === SET_TURN) {
    return !state;
  }
  return state;
};

const battleship = combineReducers({
  yourShips,
  enemyShips,
  yourGameBoard,
  enemyGameBoard,
  yourCurrentShip,
  enemyCurrentShip,
  startGame,
  startBoard,
  turn,
});
export default battleship;
