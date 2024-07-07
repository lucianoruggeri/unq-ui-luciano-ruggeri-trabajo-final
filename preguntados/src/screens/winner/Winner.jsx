import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WinnerComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers, players } = location.state || {};

  const winner = players[0].name;

  const resetGame = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Ganador: {winner}</h1>
      <p>
        Respuestas Correctas:{" "}
        {correctAnswers.length === 0 ? 0 : correctAnswers[0]}
      </p>
      <button onClick={resetGame}>PLAY AGAIN!</button>
    </div>
  );
};

export default WinnerComponent;
