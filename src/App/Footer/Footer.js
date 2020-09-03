import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetGame, startBoard } from "../../redux/actions";
import { refreshPage } from "../utils/placeOnBoard";

const Footer = () => {
  const START = startBoard;
  const startGame = useSelector((state) => state.startGame);
  const boardStart = useSelector((state) => state.startBoard);
  const dispatch = useDispatch();

  if (startGame === true && boardStart === true) {
    return null;
  }

  if (startGame === false) {
    return (
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
    );
  }

  return (
    <div className="buttons">
      <button onClick={() => dispatch(START())}>START</button>
      <button onClick={refreshPage}>RESET</button>
    </div>
  );
};
export default Footer;
