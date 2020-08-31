export const UPDATE_ENEMY_SHIP = "UPDATE_ENEMY_SHIP";
export const UPDATE_YOUR_SHIP = "UPDATE_YOUR_SHIP";
export const SET_YOUR_SHIP = "SET_YOUR_SHIP";
export const SET_ENEMY_SHIP = "SET_ENEMY_SHIP";
export const REMOVE_YOUR_SHIP = "REMOVE_YOUR_SHIP";
export const START_GAME = "START_GAME";
export const RESET_GAME = "RESET_GAME";
export const GAME_BOARD = "GAME_BOARD";

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
export const boardGame = () => {
  return {
    type: GAME_BOARD,
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
export const updateYourShip = () => {
  return {
    type: UPDATE_YOUR_SHIP,
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
