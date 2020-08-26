import React from "react";
import { useSelector } from "react-redux";
import { Ship } from "./Ship";
export const Ships = () => {
  const ships = useSelector((state) => state.shipList);
  //   debugger;
  return (
    <div className="ships">
      <h3>Your Ships</h3>

      {ships.map((ship, index) => {
        return <Ship key={index} length={ship.length} name={ship.name}></Ship>;
      })}
    </div>
  );
};
