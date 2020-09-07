import React from "react";

import GameStatus from "./GameStatus";

const Header = () => {
  return (
    <header>
      <h2>Battleship</h2>
      <GameStatus />
    </header>
  );
};
export default Header;
