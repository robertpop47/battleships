import React from "react";
import { useSelector } from "react-redux";
import { Cell } from "./Cell";

export const Row = (props) => {
  //   const rows = useSelector((state) => state.board);
  return (
    <div style={{ width: "500px", display: "flex", flexWrap: "wrap" }}>
      {props.row.map((cell, cellIndex) => {
        // row.map((cell) => {
        //   return <Cell></Cell>;
        // });
        return (
          <Cell
            key={`${props.rowIndex}${cellIndex}`}
            cellType={props.cellType}
          ></Cell>
        );
      })}
    </div>
  );
};
