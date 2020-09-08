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
            src="../../img/Mouse-1.svg"
            alt="Left mouse click width"
            width="40px"
            height="40px"
          />
          <b>Left mouse click</b> to place current ship
        </div>
        <div className="mouse">
          <img
            src="../../img/Mouse-1.svg"
            alt="Right mouse click"
            width="40px"
            height="40px"
          />
          <b>Right mouse click</b> to rotate current ship (before placing)
        </div>
      </footer>
    );
  }

  return (
    <div className="buttons">
      <button className="start" onClick={() => dispatch(START())}>
        Start
      </button>
      <a className="refresh" onClick={refreshPage}>
        <img src="../../../img/Icon.svg"></img>
        <div>Reset</div>
      </a>
    </div>
  );
};
export default Footer;
