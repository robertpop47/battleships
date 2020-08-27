import React from "react";
import { useSelector } from "react-redux";
import Row from "./Row";

export const Board = (props) => {
  const rows = useSelector((state) => state.board);
  return (
    <div className="board">
      {rows.map((row, rowIndex) => {
        // row.map((cell) => {
        //   return <Cell></Cell>;
        // });
        return <Row key={rowIndex} rowIndex={rowIndex} row={row}></Row>;
      })}
    </div>
  );
};
