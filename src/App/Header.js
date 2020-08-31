import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const start = useSelector((state) => state.start);
  const startBoard = useSelector((state) => state.startBoard);
  return (
    <header>
      <h1>Battleship</h1>
      {start === false ? (
        <h4>Place your ships</h4>
      ) : startBoard === false ? (
        <h4>All ships are in place!</h4>
      ) : (
        <h4>Your turn / Enemy turn</h4>
      )}
    </header>
  );
};
export default Header;
