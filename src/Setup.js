import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Setup() {
  const [numPlayers, setNumPlayers] = useState(4);
  const [names, setNames] = useState(["Player 1", "Player 2", "Player 3", "Player 4"]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNumPlayers = (n) => {
    setNumPlayers(n);
    setNames(Array(n).fill().map((_, i) => `Player ${i + 1}`));
  };

  const handleNameChange = (i, val) => {
    const newNames = [...names];
    newNames[i] = val;
    setNames(newNames);
  };

  const handleBegin = () => {
    const trimmed = names.map(n => n.trim());
    if (trimmed.some(n => !n)) {
      setError("All player names must be filled.");
      return;
    }
    const unique = new Set(trimmed);
    if (unique.size !== trimmed.length) {
      setError("Player names must be unique.");
      return;
    }
    setError("");
    localStorage.setItem("judgement_players", JSON.stringify(trimmed));
    navigate("/game");
  };

  return (
    <div className="max-w-xl mx-auto bg-green-800 bg-opacity-90 rounded-xl p-8 mt-8 text-white shadow-xl animate-fade-in">
      <h2 className="text-3xl font-bold mb-6">Game Setup</h2>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Number of Players:</label>
        <div className="flex gap-2 flex-wrap">
          {[...Array(8)].map((_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg font-bold ${numPlayers === i + 1 ? "bg-yellow-400 text-green-900" : "bg-green-900 text-white"} transition`}
              onClick={() => handleNumPlayers(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Player Names:</label>
        {names.map((name, i) => (
          <input
            key={i}
            type="text"
            value={name}
            onChange={e => handleNameChange(i, e.target.value)}
            className="mb-2 w-full px-3 py-2 rounded bg-green-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label={`Player ${i + 1} name`}
          />
        ))}
      </div>
      {error && <div className="text-red-400 mb-4">{error}</div>}
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-6 rounded-lg shadow transition"
        onClick={handleBegin}
      >
        Begin Game
      </button>
    </div>
  );
}