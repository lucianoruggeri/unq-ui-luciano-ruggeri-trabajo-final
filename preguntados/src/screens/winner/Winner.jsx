import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WinnerComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers, players } = location.state || {};

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
        {winner ? <h1>{winner}</h1> : <h1>It's a draw</h1>}
      </div>
      <div className="winners">
        <ul>
          {playersWithScores.map((player, index) => (
            <li key={index}>
              {player.name}: {player.correctAnswers} correct answers
            </li>
          ))}
        </ul>
      </div>
      <div className="buttons">
        <button onClick={resetGame}>PLAY AGAIN!</button>
      </div>
    </div>
  );
};

export default WinnerComponent;
