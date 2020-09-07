import React from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

const Ship = ({ ship, index, current, board, sunk }) => {
  const start = useSelector((state) => state.startBoard);
  // debugger;
  return (
    <div
      style={{
        width: `${ship.size * 20}px`,
      }}
      className={clsx({
        ship: true,
        sunk: start && sunk,
        selected: index === current || start,
      })}
    >
      {" "}
    </div>
  );
};

export default Ship;
