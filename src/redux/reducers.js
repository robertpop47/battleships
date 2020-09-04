import { combineReducers } from "redux";
import {
  SELECT_YOUR_NEXT_SHIP,
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
  ENEMY_MOVE,
} from "./actions";
import { isSunk } from "../App/utils/placeOnBoard";

const initialState = {
  yourShipList: [
    {
      name: "Carrier",
      size: 5,
      positions: [],
      sunk: false,
    },
    {
      name: "Battleship",
      size: 4,
      positions: [],
      sunk: false,
    },
    {
      name: "Destroyer",
      size: 3,
      positions: [],
      sunk: false,
    },
    {
      name: "Submarine",
      size: 3,
      positions: [],
      sunk: false,
    },
    {
      name: "Patrol Boat",
      size: 2,
      positions: [],
      sunk: false,
    },
  ],
  enemyShipList: [
    {
      name: "Carrier",
      size: 5,
      positions: [],
      sunk: false,
    },
    {
      name: "Battleship",
      size: 4,
      positions: [],
      sunk: false,
    },
    {
      name: "Destroyer",
      size: 3,
      positions: [],
      sunk: false,
    },
    {
      name: "Submarine",
      size: 3,
      positions: [],
      sunk: false,
    },
    {
      name: "Patrol Boat",
      size: 2,
      positions: [],
      sunk: false,
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
  enemyMove: {
    lastEnemyMove: [0, 0],
    lastEnemyMoveDirection: "N",
  },
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
  if (action.type === SELECT_YOUR_NEXT_SHIP) {
    return state < initialState.yourShipList.length - 1 ? state + 1 : null;
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
  const newGameBoard = [...state].map((row) => [...row]);

  if (action.type === SET_YOUR_SHIP) {
    const { newCoordinates } = action.payload;
    newCoordinates.forEach(([x, y]) => {
      newGameBoard[x][y] = { ...newGameBoard[x][y], hover: true };
    });
    return newGameBoard;
  }
  if (action.type === REMOVE_YOUR_SHIP) {
    const { shipCoordinates } = action.payload;
    shipCoordinates.forEach(([x, y]) => {
      newGameBoard[x][y] = { ...newGameBoard[x][y], hover: false };
    });
    return newGameBoard;
  }
  if (action.type === ENEMY_MOVE_HIT) {
    const { x, y } = action.payload;
    newGameBoard[x][y] = { ...newGameBoard[x][y], status: "hit" };

    const ships = [...initialState.yourShipList];
    for (let ship of ships) {
      if (isSunk(ship, newGameBoard)) {
        for (let pos of ship.positions) {
          const x = pos.row;
          const y = pos.col;
          newGameBoard[x][y] = { ...newGameBoard[x][y], status: "sunk" };
        }
      }
    }

    return newGameBoard;
  }
  if (action.type === ENEMY_MOVE_MISS) {
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
  const newGameBoard = [...state].map((row) => [...row]);

  if (action.type === SET_ENEMY_SHIP) {
    const { newCoordinates } = action.payload;
    newCoordinates.forEach(([x, y]) => {
      newGameBoard[x][y] = { ...newGameBoard[x][y], status: "occupied" };
    });
    return newGameBoard;
  }
  if (action.type === YOUR_MOVE_HIT) {
    const { x, y } = action.payload;
    newGameBoard[x][y] = { ...newGameBoard[x][y], status: "hit" };

    const ships = [...initialState.enemyShipList];
    for (let ship of ships) {
      if (isSunk(ship, newGameBoard)) {
        for (let pos of ship.positions) {
          const x = pos.row;
          const y = pos.col;
          newGameBoard[x][y] = { ...newGameBoard[x][y], status: "sunk" };
        }
      }
    }

    return newGameBoard;
  }
  if (action.type === YOUR_MOVE_MISS) {
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

const enemyMove = (state = initialState.enemyMove, action) => {
  if (action.type === ENEMY_MOVE) {
    const { coords: enemyMove, direction: enemyMoveDirection } = action.payload;
    return {
      // ...state,
      lastEnemyMove: enemyMove,
      lastEnemyMoveDirection: enemyMoveDirection,
    };
  }
  return { ...state };
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
  enemyMove,
});
export default battleship;
