import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";

const Ship = ({ ship, index, sunk }) => {
  const start = useSelector((state) => state.startBoard);
  const currentShip = useSelector((state) => state.yourCurrentShip);

  return (
    <div
      style={{
        width: `${ship.size * 20}px`,
      }}
      className={clsx({
        ship: true,
        sunk: sunk,
        selected: index === currentShip || start,
      })}
    >
      {" "}
    </div>
  );
};

export default Ship;
