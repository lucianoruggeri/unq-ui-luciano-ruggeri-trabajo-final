import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";
import axios from "axios";

const Game = ({ settings }) => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5); // 30 segundos por pregunta
  const [isLoading, setIsLoading] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(
    Array(settings.players.length).fill(0),
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeUp, setTimeUp] = useState(false);
  const [timerActive, setTimerActive] = useState(true);

  const { players, difficulty } = settings;

  useEffect(() => {
    axios
      .get(
        `https://preguntados-api.vercel.app/api/questions?difficulty=${difficulty}`,
      )
      .then((response) => {
        setQuestions(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setTimeUp(true);
      setSelectedOption("timeUp");
      setTimeout(() => {
        handleNextTurn();
      }, 1000); // Espera 1 segundo antes de pasar al siguiente turno
    }
  }, [timerActive, timeLeft]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentPlayer = players[currentPlayerIndex].name;
  const totalQuestions = players[1] ? questions.length / 2 : questions.length;

  const handleNextTurn = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
      setTimeLeft(5);
      setSelectedOption(null);
      setIsCorrect(null);
      setTimeUp(false);
      setTimerActive(true);
    } else {
      navigate("/winner", { state: { correctAnswers, players } });
    }
  };

  const handleAnswer = (answer) => {
    if (timeUp) return;
    setTimerActive(false);
    axios
      .post(`https://preguntados-api.vercel.app/api/answer`, {
        questionId: currentQuestion.id,
        option: answer,
      })
      .then((response) => {
        const isCorrect = response.data.answer;
        setIsCorrect(isCorrect);
        setSelectedOption(answer);
        if (isCorrect) {
          setCorrectAnswers((prevCorrectAnswers) => {
            const newCorrectAnswers = [...prevCorrectAnswers];
            newCorrectAnswers[currentPlayerIndex] += 1;
            return newCorrectAnswers;
          });
        }
        setTimeout(() => {
          handleNextTurn();
        }, 1000);
      })
      .catch((error) => console.error(error));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-container">
      <div className="game-info">
        <h1>Player: {currentPlayer}</h1>
        <h1>Time Left: {timeLeft}s</h1>
        <h1>
          {currentQuestionIndex + 1}/{totalQuestions}
        </h1>
      </div>
      <div className="question-container">
        <h2>{currentQuestion.question}</h2>
        <div className="options-container">
          {Object.keys(currentQuestion)
            .filter((key) => key.startsWith("option"))
            .map((key, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(key)}
                className={
                  timeUp || (selectedOption === key && isCorrect === false)
                    ? "incorrect-option"
                    : selectedOption === key && isCorrect === true
                      ? "correct-option"
                      : ""
                }
                disabled={selectedOption !== null || timeUp}
              >
                {currentQuestion[key]}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
