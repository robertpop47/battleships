import React from "react";
import { useSelector } from "react-redux";

const GameStatus = () => {
  const startGame = useSelector((state) => state.startGame);
  const startBoard = useSelector((state) => state.startBoard);
  const yourTurn = useSelector((state) => state.turn);
  const yourSunkShips = useSelector((state) => state.yourSunkShips);
  const enemySunkShips = useSelector((state) => state.enemySunkShips);

  if (yourSunkShips !== 5 && enemySunkShips !== 5) {
    if (startGame === false) {
      return <h4 className="game-status">Place your ships</h4>;
    }
    if (startBoard === false) {
      return <h4 className="game-status">All ships are in place!</h4>;
    }
    if (yourTurn) {
      return <h4 className="game-status">Your turn</h4>;
    }
    return <h4 className="game-status">Enemy turn</h4>;
  }
  return <h4 />;
};
export default GameStatus;
