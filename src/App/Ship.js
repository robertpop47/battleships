import React from "react";
import { useSelector } from "react-redux";
const Ship = ({ ship, index }) => {
  const start = useSelector((state) => state.start);
  const currentShip = useSelector((state) => state.currentShip);
  let color;
  if (index === currentShip || start === true) color = "rgb(80, 81, 82)";
  else color = "rgb(185, 185, 185)";
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
