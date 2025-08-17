import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import HowToPlay from "./HowToPlay";
import Setup from "./Setup";
import Game from "./Game";
import "./App.css";

import { useLocation, useNavigate } from "react-router-dom";

function HomeButton() {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname === "/") return null;
  return (
    <button
      className="btn btn-howto"
      style={{ position: "fixed", top: 18, left: 18, zIndex: 100, fontSize: "1.1rem", padding: "0.5rem 1.2rem", borderRadius: "10px", boxShadow: "0 2px 8px rgba(44,62,80,0.08)" }}
      onClick={() => navigate("/")}
      aria-label="Home"
    >
      &#8962; Home
    </button>
  );
}

function App() {
  return (
    <Router>
      <HomeButton />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/howto" element={<HowToPlay />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      <div style={{ position: "fixed", left: 0, right: 0, bottom: 10, textAlign: "center", zIndex: 1000, fontSize: "1.5rem", color: "#184d2b", opacity: 0.8,  }}>
        <span>
          <b>Developed by <a href="https://www.aadithsukumar.me" target="_blank" rel="noopener noreferrer" style={{ color: "#5a1010ff", fontWeight: 900, textDecoration: "underline" }}>Aadith Sukumar</a></b>
        </span>
      </div>
    </Router>
  );
}

export default App;


