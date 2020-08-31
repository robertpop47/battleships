import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetGame, boardGame } from "./actions";

const Footer = () => {
  const start = useSelector((state) => state.start);
  const startBoard = useSelector((state) => state.startBoard);
  const dispatch = useDispatch();
  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <div>
      {start === true ? (
        startBoard === false ? (
          <div className="buttons">
            <button onClick={() => dispatch(boardGame())}>START</button>
            <button onClick={/*() => dispatch(resetGame())*/ refreshPage}>
              RESET
            </button>
          </div>
        ) : (
          <div />
        )
      ) : (
        <footer>
          <div className="mouse">
            <img
              src="https://static.thenounproject.com/png/394670-200.png"
              alt="Left mouse click width"
              width="40px"
              height="40px"
            />
            <p className="text_mouse">Left mouse click</p>
            <p>to place current ship</p>
          </div>
          <div className="mouse">
            <img
              src="https://network1consulting.com/wp-content/uploads/2019/09/394671-200.png"
              alt="Right mouse click"
              width="40px"
              height="40px"
            />
            <p className="text_mouse">Right mouse click</p>
            <p>to rotate current ship (before placing)</p>
          </div>
        </footer>
      )}
    </div>
  );
};
export default Footer;
