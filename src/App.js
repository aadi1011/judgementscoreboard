import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import HowToPlay from "./HowToPlay";
import Setup from "./Setup";
import Game from "./Game";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react"

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
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/howto" element={<HowToPlay />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


