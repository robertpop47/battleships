import React from "react";
import { useSelector } from "react-redux";

const Ship = ({ ship, index, sunk }) => {
  const start = useSelector((state) => state.startBoard);
  const currentShip = useSelector((state) => state.yourCurrentShip);
  let color;
  if (sunk) {
    color = "red";
  }
  if (index === currentShip || start === true) {
    color = "rgb(11, 148, 56)";
  } else color = "rgb(185, 185, 185)";
  return (
    <div
      style={{
        backgroundColor: `${color}`,
        width: `${ship.size * 20}px`,
        height: "20px",
        border: "1px solid gray",
        marginBottom: "10px",
      }}
    >
      {" "}
    </div>
  );
};

export default Ship;
