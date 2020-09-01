import React from "react";

import GameStatus from "./GameStatus";

const Header = () => {
  return (
    <header>
      <h1>Battleship</h1>
      <GameStatus />
    </header>
  );
};
export default Header;
