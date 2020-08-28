import React from "react";
import { classUpdate } from "./placeOnBoard";
import { useSelector, connect, useDispatch } from "react-redux";
import { mouseEnter, mouseLeave } from "./actions";

const Cell = ({ value, i, j, handleHover, handleClick, handleRotate }) => {
  if (value.status === "label") {
    return <div className="cell-text">{value.label}</div>;
  } else
    return (
      <div
        className={classUpdate(value)}
        contextMenu="mymenu"
        onContextMenu={() => handleRotate()}
        onMouseEnter={() => handleHover(i, j, "enter")}
        onMouseLeave={() => handleHover(i, j, "leave")}
        onClick={() => handleClick(i, j)}
      >
        {value.type}
      </div>
    );
};

export default Cell;
