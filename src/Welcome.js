
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="centered-container animate-fade-in">
      <div className="welcome-box">
        <Header />
        <div className="welcome-buttons">
          <button className="btn btn-start" onClick={() => navigate("/setup")}>Start Game</button>
          <button className="btn btn-howto" onClick={() => navigate("/howto")}>How to Play</button>
        </div>
        {/* Placeholder for future content: setup, rules, etc. */}
        <div className="welcome-desc">
          <span>Welcome to the Judgement Card Game Scoreboard!<br />
            Track your game, bids, and scores with a beautiful, interactive interface.<br />
            {/* <span style={{ fontSize: "0.95rem", color: "#184d2b" }}>
              (Game setup and rules coming soon)
            </span> */}
          </span>
        </div>
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Judgement Scoreboard. All rights reserved.
      </footer>
    </div>
  );
}