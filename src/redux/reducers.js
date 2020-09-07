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
  YOUR_SUNK_SHIPS,
  ENEMY_SUNK_SHIPS,
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
      sunk: true,
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
  yourSunkShips: 0,
  enemySunkShips: 0,
};

let sunk = {
  yourSunkShips: 0,
  enemySunkShips: 0,
};
// placeRandomEnemyShips();

const yourSunkShips = (state = initialState.yourSunkShips, action) => {
  // if (action.type === "YOUR_SUNK_SHIPS") {
  //   return action.payload;
  // }
  return sunk.yourSunkShips;
};
const enemySunkShips = (state = initialState.enemySunkShips, action) => {
  // if (action.type === "ENEMY_SUNK_SHIPS") {
  //   return action.payload;
  // }
  return sunk.enemySunkShips;
};

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
  // if (action.type === ENEMY_SHIPS_SUNK) {
  //   let sunk = action.payload;
  //   let ships = [...state];
  //   for (let shipIndex in ships) {
  //     ships[shipIndex].sunk = sunk[shipIndex];
  //   }

  //   return [...ships];
  // }
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
    let shipSunk = 0;
    for (let ship of ships) {
      if (isSunk(ship, newGameBoard)) {
        shipSunk++;
        for (let pos of ship.positions) {
          const x = pos.row;
          const y = pos.col;
          newGameBoard[x][y] = { ...newGameBoard[x][y], status: "sunk" };
        }
      }
    }
    sunk.yourSunkShips = shipSunk;

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
    let shipSunk = 0;
    for (let ship of ships) {
      if (isSunk(ship, newGameBoard)) {
        shipSunk++;
        for (let pos of ship.positions) {
          const x = pos.row;
          const y = pos.col;
          newGameBoard[x][y] = { ...newGameBoard[x][y], status: "sunk" };
        }
      }
    }
    sunk.enemySunkShips = shipSunk;

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
  yourSunkShips,
  enemySunkShips,
});
export default battleship;
