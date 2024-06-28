import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import PlayerCard from "../../components/PlayerCard";

const Settings = ({ setSettings }) => {
  const navigate = useNavigate();

  const [showPlayersDetail, setShowPlayersDetail] = useState(true);
  const [showDifficultyDetail, setShowDifficultyDetail] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const [players, setPlayers] = useState([{ name: "" }]);
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    const allNamesFilled = players.every((player) => player.name.trim() !== "");
    setIsNextEnabled(allNamesFilled);
  }, [players]);

  const playGame = () => {
    setSettings({ players, difficulty });
    navigate("/play");
  };

  const addPlayer = () => {
    if (players.length < 2) {
      setPlayers([...players, { name: "" }]);
    }
  };

  const removePlayer = () => {
    if (players.length > 1) {
      setPlayers(players.slice(0, -1));
    }
  };

  const setPlayerName = (index, name) => {
    const newPlayers = [...players];
    newPlayers[index].name = name;
    setPlayers(newPlayers);
  };

  const moveToDifficultyDetail = () => {
    setShowPlayersDetail(false);
    setShowDifficultyDetail(true);
  };
  const moveToPlayerDetail = () => {
    setShowDifficultyDetail(false);
    setShowPlayersDetail(true);
  };

  return (
    <>
      {showPlayersDetail && (
        <div className="settings-container">
          <h1>Player Details</h1>
          <div className="players-list">
            {players.map((player, index) => (
              <PlayerCard
                key={index}
                index={index}
                name={player.name}
                setName={setPlayerName}
              />
            ))}
          </div>
          <div className="buttons-container">
            <button onClick={removePlayer} disabled={players.length === 1}>
              -
            </button>
            <span>
              {players.length} {players.length === 1 ? "Player" : "Players"}
            </span>
            <button onClick={addPlayer} disabled={players.length === 2}>
              +
            </button>
          </div>
          <button
            className="next-button"
            onClick={moveToDifficultyDetail}
            disabled={!isNextEnabled}
          >
            NEXT
          </button>
        </div>
      )}
      {showDifficultyDetail && (
        <div className="settings-container">
          <h1>Seleccionar Dificultad del Juego</h1>
          <div className="difficulty-options">
            <label>
              EASY
              <input
                type="radio"
                name="difficulty"
                value="easy"
                onChange={(e) => setDifficulty(e.target.value)}
                checked={difficulty === "easy"}
              />
            </label>
            <label>
              INTERMEDIATE
              <input
                type="radio"
                name="difficulty"
                value="intermediate"
                onChange={(e) => setDifficulty(e.target.value)}
                checked={difficulty === "intermediate"}
              />
            </label>
            <label>
              HARD
              <input
                type="radio"
                name="difficulty"
                value="hard"
                onChange={(e) => setDifficulty(e.target.value)}
                checked={difficulty === "hard"}
              />
            </label>
          </div>
          <div className="buttons-container">
            <button onClick={moveToPlayerDetail}>Atrás</button>
            <button onClick={playGame} disabled={!difficulty}>
              Jugar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
