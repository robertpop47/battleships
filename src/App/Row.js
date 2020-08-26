import React from "react";
import { useSelector } from "react-redux";
import { Cell } from "./Cell";
import { Hoverable } from "./Hoverable";

export const Row = (props) => {
  //   const rows = useSelector((state) => state.board);
  return (
    <div style={{ width: "500px", display: "flex", flexWrap: "wrap" }}>
      {props.row.map((cell, cellIndex) => {
        // row.map((cell) => {
        //   return <Cell></Cell>;
        // });
        return (
          // <Hoverable>
          <Cell
            key={`${props.rowIndex}${cellIndex}`}
            // val={props.cellType}
          ></Cell>
          // </Hoverable>
        );
      })}
    </div>
  );
};
