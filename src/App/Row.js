import React from "react";
import { useSelector, Provider, useDispatch, connect } from "react-redux";
import Cell from "./Cell";
import { Hoverable } from "./Hoverable";
import store from "./stores";
import { mouseEnter, mouseLeave } from "./actions";

const Row = (props) => {
  //   const rows = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const hovered = useSelector((state) => state.hovered);
  return (
    <div
      style={{
        width: "500px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {props.row.map((cell, cellIndex) => {
        // row.map((cell) => {
        //   return <Cell></Cell>;
        // });
        return (
          // <Hoverable>

          <Cell
            key={`${props.rowIndex}${cellIndex}`}
            coordinates={`${props.rowIndex}${cellIndex}`}
            val={123}
            color={hovered[props.rowIndex][cellIndex] ? "green" : "white"}
            // onMouseEnter={() => {
            //   dispatch(mouseEnter(`${props.rowIndex}${cellIndex}`));
            // }}
            // onMouseLeave={() => {
            //   dispatch(mouseLeave(`${props.rowIndex}${cellIndex}`));
            // }}
          ></Cell>

          // </Hoverable>
        );
      })}
      {console.log(props.rowIndex)}
    </div>
  );
};

export default connect()(Row);
