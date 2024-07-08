import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Winner.css";

const WinnerComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers, players } = location.state || {};

  useEffect(() => {
    // Prevent navigation back to the previous page
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate("/");
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  let playersWithScores = players.map((player, index) => ({
    name: player.name,
    correctAnswers: correctAnswers[index],
  }));

  playersWithScores.sort(
    (player1, player2) => player2.correctAnswers - player1.correctAnswers,
  );

  let winner;

  if (correctAnswers.length === 1) {
    winner = players[0].name;
  } else if (
    playersWithScores[0].correctAnswers > playersWithScores[1].correctAnswers
  ) {
    winner = playersWithScores[0].name;
  } else if (
    playersWithScores[0].correctAnswers < playersWithScores[1].correctAnswers
  ) {
    winner = playersWithScores[1].name;
  } else {
    winner = null; // Empate
  }

  const resetGame = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="header">
        {winner ? <h1>Congratulations</h1> : <h1>It's a tie</h1>}
      </div>
      <div className={`results ${winner ? "" : "tie"}`}>
        {playersWithScores.map((player, index) => (
          <div
            className={`winner ${player.name == players[0].name ? "one" : "two"}`}
            key={index}
          >
            <div>{player.name.toUpperCase()}</div>
            <div>{player.correctAnswers} correct answers</div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button className="play-button" onClick={resetGame}>
          PLAY AGAIN!
        </button>
      </div>
    </div>
  );
};

export default WinnerComponent;
