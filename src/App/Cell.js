import React from "react";

import { useSelector, connect, useDispatch } from "react-redux";
import { mouseEnter, mouseLeave } from "./actions";

const Cell = (props) => {
  const dispatch = useDispatch();

  return (
    <div
      className="cell"
      style={{
        height: "40px",
        width: "40px",
        border: "1px solid grey",
        backgroundColor: props.color,
      }}
      onMouseEnter={() => {
        dispatch(mouseEnter(props.coordinates));
      }}
      onMouseLeave={() => {
        dispatch(mouseLeave(props.coordinates));
      }}
    >
      {props.coordinates}
      {/* {console.log(props.key)} */}
    </div>
  );
};

export default connect()(Cell);
