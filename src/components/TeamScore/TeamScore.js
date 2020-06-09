import React, { useState } from "react";
import "./TeamScore.scss";

const TeamScore = ({ teamNumber, teamScore, pointsClickHandler }) => {
  const [points, setPoints] = useState("");
  const [teamName, setTeamName] = useState("");

  const pointsEntered = (e) => {
    e.preventDefault();
    setPoints(parseInt(e.target.value));
  };

  const submitName = (e) => {
    e.preventDefault();
    setTeamName(e.target.name.value);
    e.target.reset();
  };

  const plusClickHandler = () => {
    pointsClickHandler(teamNumber, points);
    setPoints("");
  };

  const minusClickHandler = () => {
    pointsClickHandler(teamNumber, -points);
    setPoints("");
  };

  // Reset Team Name
  const handlesClick = () => {
    setTeamName("");
  };

  return (
    <>
      <div className="teamscore">
        {/* <h1 className="teamscore__heading">Team {teamNumber}</h1> */}
        {teamName && teamName !== "" ? (
          <h2 className="teamscore__customName" onClick={handlesClick}>
            {teamName}
          </h2>
        ) : (
          <>
            <form onSubmit={submitName}>
              <div className="teamscore__name-wrap">
                <label
                  className="teamscore__name-label"
                  htmlFor="teamscore__name"
                >
                  Team Name
                </label>
                <div className="teamscore__input-wrap">
                  <input
                    className="teamscore__name-input"
                    type="text"
                    name="name"
                    maxlength="27"
                    required
                  />
                  <button className="teamscore__button" type="submit">
                    Enter
                  </button>
                </div>
              </div>
            </form>
          </>
        )}

        <p className="teamscore__score">{teamScore}</p>
        <div className="teamscore__score-input-wrap">
          <button
            className="teamscore__score-button teamscore__score-button--subtract"
            onClick={minusClickHandler}
          >
            <p className="teamscore__score-button-text">-</p>
          </button>
          <input
            className="teamscore__score-input"
            type="number"
            value={points}
            onChange={pointsEntered}
            required
          />
          <button
            className="teamscore__score-button"
            onClick={plusClickHandler}
          >
            <p className="teamscore__score-button-text">+</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default TeamScore;
