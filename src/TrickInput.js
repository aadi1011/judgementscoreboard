import React, { useState } from "react";

export default function TrickInput({ round, activePlayers, tricks, setTricks, onComplete }) {
  const [currentTrick, setCurrentTrick] = useState(tricks.length);
  const [winner, setWinner] = useState("");
  const [error, setError] = useState("");

  const handleTrick = () => {
    if (!winner) {
      setError("Please select a winner.");
      return;
    }
    setError("");
    const newTricks = [...tricks, winner];
    setTricks(newTricks);
    setWinner("");
    if (newTricks.length === round) {
      onComplete(newTricks);
    } else {
      setCurrentTrick(currentTrick + 1);
    }
  };

  return (
    <div className="bg-green-900 bg-opacity-90 rounded-xl p-6 shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold text-yellow-300 mb-4">Round {round} - Trick Winners</h3>
      <div className="mb-4 text-white">
        Tricks completed: {tricks.length} / {round}
      </div>
      {currentTrick < round && (
        <div>
          <label className="block mb-2 font-semibold text-white">
            Trick {currentTrick + 1}: Who won?
          </label>
          <select
            value={winner}
            onChange={e => setWinner(e.target.value)}
            className="w-48 px-3 py-2 rounded bg-green-800 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Trick winner select"
          >
            <option value="">Select player</option>
            {activePlayers.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
          <button
            className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded-lg shadow transition"
            onClick={handleTrick}
          >
            Submit
          </button>
        </div>
      )}
      {error && <div className="text-red-400 mt-4">{error}</div>}
    </div>
  );
}