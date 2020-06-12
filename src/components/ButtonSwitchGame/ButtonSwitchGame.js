import React from "react";
import "./ButtonSwitchGame.scss";

const ButtonSwitchGame = ({ gameNum, handlesClick, currGame }) => {
  return (
    <div
      className={`buttonswitchgame ${
        currGame === gameNum ? "buttonswitchgame__activeGame" : ""
      }`}
    >
      {(gameNum + 1) % 2 === 0 && (
        <div className="buttonswitchgame__double">2X</div>
      )}
      <button
        className={`buttonswitchgame__button ${
          currGame === gameNum ? "buttonswitchgame__activeGame" : ""
        }`}
        onClick={() => handlesClick(gameNum)}
      >
        Game {gameNum + 1}
      </button>
    </div>
  );
};

export default ButtonSwitchGame;
