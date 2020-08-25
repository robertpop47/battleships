import React from "react";
import { useSelector } from "react-redux";
import { Ship } from "./Ship";
export const Ships = () => {
  const ships = useSelector((state) => state.shipList);
  //   debugger;
  return (
    <div>
      Your Ships{": "}
      {ships.map((ship) => {
        return (
          <Ship key={ship.name} length={ship.length} name={ship.name}></Ship>
        );
      })}
    </div>
  );
};
