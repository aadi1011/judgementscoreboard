import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Welcome from "./Welcome";
import HowToPlay from "./HowToPlay";
import Setup from "./Setup";
import Game from "./Game";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 font-sans">
        <nav className="flex justify-between items-center px-6 py-4 bg-green-950 text-white shadow-lg">
          <Link to="/" className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition">Judgement Scoreboard</Link>
          <div>
            <Link to="/howto" className="mr-4 hover:text-yellow-300 transition">How to Play</Link>
            <Link to="/setup" className="hover:text-yellow-300 transition">Start Game</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/howto" element={<HowToPlay />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;