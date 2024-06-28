import React from "react";
import "./PlayerCard.css";
import { FaRegUserCircle } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { TbUserFilled } from "react-icons/tb";

const PlayerCard = ({ index, name, setName }) => {
  const handleNameChange = (e) => {
    setName(index, e.target.value);
  };

  return (
    <div className="player-card">
      <div className="player-icon">
        <TbUserFilled size={150} />
      </div>
      <div className="player-info">
        <label>Player {index + 1}</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter Name"
        />
      </div>
    </div>
  );
};

export default PlayerCard;
