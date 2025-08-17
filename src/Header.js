import React from "react";

export default function Header() {
  return (
    <header style={{ width: "100%" }}>
      <div className="welcome-title">
        One Card (Judgement) Game Scoreboard
      </div>
      <div>
        {/* Card icon placeholder: SVG spade */}
        <span className="card-icon" role="img" aria-label="Card Icon">

        </span>
      </div>
    </header>
  );
}
