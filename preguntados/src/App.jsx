import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/home/Home";
import Game from "./screens/game/Game";
import Winner from "./screens/winner/Winner";

function App() {
  const [jugadores, setJugadores] = useState(1); // 1 o 2 jugadores
  const [nivelDificultad, setNivelDificultad] = useState("facil"); // 'facil', 'medio', 'dificil'
  const [preguntas, setPreguntas] = useState([]);

  return (
    <div className="app">
      <div className="background">
        <div className="modal">
          <Router>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/play" element={<Game />}></Route>
              <Route path="/winner" element={<Winner />}></Route>
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
