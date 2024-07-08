import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { FaPlay } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/settings");
  };

  return (
    <div className="home">
      <img src={logo} className="home-logo" alt="Logo" />
      <button className="play-button" onClick={startGame}>
        <FaPlay className="play-icon" /> {/* Icono de play */}
        Get Started
      </button>
    </div>
  );
};

export default Home;
