import React from "react";
import { useSelector } from "react-redux";

const GameStatus = () => {
  const startGame = useSelector((state) => state.startGame);
  const startBoard = useSelector((state) => state.startBoard);

  if (startGame === false) {
    return <h4>Place your ships</h4>;
  }
  if (startBoard === false) {
    return <h4>All ships are in place!</h4>;
  }

  return <h4>Your turn / Enemy turn</h4>;
};
export default GameStatus;
