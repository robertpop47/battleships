import React from "react";
import { useSelector } from "react-redux";

export const Hoverable = (props) => {
  hovered = useSelector((state) => state.hovered);

  return (
    <div>
      {this.props.render(this.hovered)}
      {/* {console.log("hovered.")} */}
    </div>
  );
};
