import React, { useState } from "react";

export default function BiddingForm({ round, activePlayers, bids, setBids, onComplete }) {
  const [currentBid, setCurrentBid] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(bids.length);
  const [error, setError] = useState("");

  const handleBid = () => {
    const bidNum = Number(currentBid);
    if (isNaN(bidNum) || bidNum < 0 || bidNum > round) {
      setError(`Bid must be between 0 and ${round}.`);
      return;
    }
    // Last player: enforce sum != round
    if (currentPlayer === activePlayers.length - 1) {
      const sumSoFar = bids.reduce((a, b) => a + b, 0);
      if (sumSoFar + bidNum === round) {
        setError(`Cannot bid ${bidNum}; sum would equal round number (${round}). Choose another.`);
        return;
      }
    }
    setError("");
    const newBids = [...bids, bidNum];
    setBids(newBids);
    setCurrentBid("");
    if (newBids.length === activePlayers.length) {
      onComplete(newBids);
    } else {
      setCurrentPlayer(currentPlayer + 1);
    }
  };

  return (
    <div className="bg-green-900 bg-opacity-90 rounded-xl p-6 shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold text-yellow-300 mb-4">Round {round} Bidding</h3>
      <div className="mb-4">
        <div className="text-white font-semibold mb-2">
          {activePlayers.map((p, i) => (
            <span key={p.name} className={i === currentPlayer ? "text-yellow-400" : ""}>
              {p.name}{i < activePlayers.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div className="text-white mb-2">
          Current bids: {bids.map((b, i) => `${activePlayers[i].name}: ${b}`).join(", ") || "None"}
        </div>
        <div className="text-white mb-2">
          Current sum: {bids.reduce((a, b) => a + b, 0)}
        </div>
      </div>
      {currentPlayer < activePlayers.length && (
        <div>
          <label className="block mb-2 font-semibold text-white">
            {activePlayers[currentPlayer].name}, enter your bid (0-{round}):
          </label>
          <input
            type="number"
            min={0}
            max={round}
            value={currentBid}
            onChange={e => setCurrentBid(e.target.value)}
            className="w-24 px-3 py-2 rounded bg-green-800 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Bid input"
          />
          <button
            className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded-lg shadow transition"
            onClick={handleBid}
          >
            Submit
          </button>
        </div>
      )}
      {error && <div className="text-red-400 mt-4">{error}</div>}
    </div>
  );
}