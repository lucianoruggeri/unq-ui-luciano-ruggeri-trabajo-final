import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/home/Home";
import Game from "./screens/game/Game";
import Winner from "./screens/winner/Winner";
import Settings from "./screens/settings/Settings";

function App() {
  const [settings, setSettings] = useState([]);

  return (
    <div className="app">
      <div className="background">
        <div className="modal">
          <Router>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/settings"
                element={<Settings setSettings={setSettings} />}
              ></Route>
              <Route
                path="/play"
                element={<Game settings={settings} />}
              ></Route>
              <Route path="/winner" element={<Winner />}></Route>
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
