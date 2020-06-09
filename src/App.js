import React, { useState, useEffect } from "react";
import "./App.scss";
import Category from "./components/Category/Category";
import FinalJeopardy from "./components/FinalJeopardy/FinalJeopardy";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import ButtonSwitchGame from "./components/ButtonSwitchGame/ButtonSwitchGame";
import whitelogo from "./assets/img/connected/ConnectedLogoWhite.png";
import data from "./data/data";
import dataAlt from "./data/dataAlt";
import dataAlt2 from "./data/dataAlt2";
import dataAlt3 from "./data/dataAlt3";
import dataAlt4 from "./data/dataAlt4";
import dataAlt5 from "./data/dataAlt5";
import finaljep from "./data/finaljep";
import introMusic from "./assets/music/intro.mp3";

const gameData = [data, dataAlt, dataAlt2, dataAlt3, dataAlt4, dataAlt5];

function App() {
  const [categories, setCategories] = useState(null);
  const [revealed, setRevealed] = useState([]);
  const [finalJeopardyStatus, setFinalJeopardyStatus] = useState(false);
  const [playIntro, setPlayIntro] = useState(false);
  const [finalJepQ, setFinalJepQ] = useState(finaljep[0]);
  const [currGame, setCurrGame] = useState(null);

  const addToRevealed = () => {
    const newlyRevealed = [...revealed, revealed.length + 1];
    setRevealed(newlyRevealed);
  };

  const getRandomInt = () => {
    return Math.floor(Math.random() * Math.floor(5));
  };

  const setNewGame = (num) => {
    // setPlayIntro(false);
    let quest = {};
    let counter = 0;
    do {
      quest = gameData[num][getRandomInt()].questions[getRandomInt()];
      if (!quest["dailydouble"]) {
        quest["dailydouble"] = true;
        counter++;
      }
    } while (counter < 2);

    // reset state variables
    setRevealed([]);
    setFinalJeopardyStatus(false);
    setCategories(gameData[num]);
    setFinalJepQ(finaljep[num]);
    setCurrGame(num);
  };

  useEffect(() => {
    setNewGame(0);
  }, []);

  const handlesClick = (num) => {
    setNewGame(num);
  };

  const handlesFinalJepClick = () => {
    setFinalJeopardyStatus(!finalJeopardyStatus);
  };

  const handlesMusicClick = () => {
    setPlayIntro(!playIntro);
  };

  return (
    <div className="app">
      {playIntro && <audio autoplay="autoplay" src={introMusic}></audio>}
      <h1
        className={`app__heading ${playIntro ? "app__heading--active" : ""}`}
        onClick={handlesMusicClick}
      >
        Jeopardy!
      </h1>
      {finalJeopardyStatus === true ? (
        <FinalJeopardy finalJeopardyQ={finalJepQ} />
      ) : (
        <div className="app__cards">
          {categories &&
            categories.map((category) => {
              return (
                <Category
                  category={category}
                  addToRevealed={addToRevealed}
                  currGame={currGame}
                />
              );
            })}
        </div>
      )}

      <Scoreboard />
      <div className="app__games">
        {gameData.map((game, i) => {
          return (
            <ButtonSwitchGame
              gameNum={i}
              handlesClick={handlesClick}
              currGame={currGame}
            />
          );
        })}
      </div>
      <button className="app__button-finaljep" onClick={handlesFinalJepClick}>
        {`${finalJeopardyStatus ? "Back" : "Final Jeopardy"}`}
      </button>
    </div>
  );
}

export default App;
