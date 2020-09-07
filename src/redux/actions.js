export const UPDATE_ENEMY_SHIP = "UPDATE_ENEMY_SHIP";
export const SELECT_YOUR_NEXT_SHIP = "SELECT_YOUR_NEXT_SHIP";
export const SET_YOUR_SHIP = "SET_YOUR_SHIP";
export const SET_ENEMY_SHIP = "SET_ENEMY_SHIP";
export const REMOVE_YOUR_SHIP = "REMOVE_YOUR_SHIP";
export const START_GAME = "START_GAME";
export const RESET_GAME = "RESET_GAME";
export const START_BOARD = "START_BOARD";
export const YOUR_MOVE_HIT = "YOUR_MOVE_HIT";
export const YOUR_MOVE_MISS = "YOUR_MOVE_MISS";
export const SET_TURN = "SET_TURN";
export const ENEMY_MOVE_HIT = "ENEMY_MOVE_HIT";
export const ENEMY_MOVE_MISS = "ENEMY_MOVE_MISS";
export const ENEMY_MOVE = "ENEMY_MOVE";
export const ENEMY_SHIPS_SUNK = "ENEMY_SHIPS_SUNK";

export const updateGrid = (grid) => {
  return {
    type: UPDATE_GRID,
    grid,
  };
};
export const startGame = () => {
  return {
    type: START_GAME,
  };
};
export const startBoard = () => {
  return {
    type: START_BOARD,
  };
};
export const resetGame = () => {
  return {
    type: RESET_GAME,
  };
};
export const updateEnemyShip = () => {
  return {
    type: UPDATE_ENEMY_SHIP,
  };
};
export const selectYourNextShip = () => {
  return {
    type: SELECT_YOUR_NEXT_SHIP,
  };
};
export const setYourShip = (newCoordinates) => {
  return {
    type: SET_YOUR_SHIP,
    payload: {
      newCoordinates,
    },
  };
};
export const setEnemyShip = (newCoordinates) => {
  return {
    type: SET_ENEMY_SHIP,
    payload: {
      newCoordinates,
    },
  };
};
export const removeYourShip = (shipCoordinates) => {
  return {
    type: REMOVE_YOUR_SHIP,
    payload: {
      shipCoordinates,
    },
  };
};
export const yourMoveHit = (x, y) => {
  return {
    type: YOUR_MOVE_HIT,
    payload: {
      x,
      y,
    },
  };
};
export const yourMoveMiss = (x, y) => {
  return {
    type: YOUR_MOVE_MISS,
    payload: {
      x,
      y,
    },
  };
};
export const setTurn = () => {
  return {
    type: SET_TURN,
  };
};
export const enemyMoveHit = (x, y) => {
  return {
    type: ENEMY_MOVE_HIT,
    payload: {
      x,
      y,
    },
  };
};
export const enemyMoveMiss = (x, y) => {
  return {
    type: ENEMY_MOVE_MISS,
    payload: {
      x,
      y,
    },
  };
};
export const lastEnemyMove = (coords, direction) => {
  return {
    type: ENEMY_MOVE,
    payload: {
      coords,
      direction,
    },
  };
};
// export const enemyShipsSunk = (sunk) => {
//   return {
//     type: ENEMY_SHIPS_SUNK,
//     payload: {
//       sunk,
//     },
//   };
// };
