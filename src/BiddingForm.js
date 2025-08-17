
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

  // Helper for bid status
  const sumSoFar = bids.reduce((a, b) => a + b, 0);
  let bidStatus = "";
  if (currentPlayer === activePlayers.length - 1 && currentBid !== "") {
    if (sumSoFar + Number(currentBid) < round) bidStatus = "Underbid";
    if (sumSoFar + Number(currentBid) > round) bidStatus = "Overbid";
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffd700', marginBottom: '1rem', fontFamily: 'Oswald, Roboto, Arial' }}>Round {round} Bidding</h3>
      <div style={{ width: '100%', marginBottom: '1.2rem', textAlign: 'center' }}>
        <div className="status" style={{ marginBottom: '0.5rem' }}>
          {activePlayers.map((p, i) => (
            <span key={p.name} style={i === currentPlayer ? { color: '#ffd700', fontWeight: 700 } : {}}>
              {p.name}{i < activePlayers.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div className="status" style={{ marginBottom: '0.5rem' }}>
          Current bids: {bids.map((b, i) => `${activePlayers[i].name}: ${b}`).join(", ") || "None"}
        </div>
        <div className="status" style={{ marginBottom: '0.5rem' }}>
          Current sum: {sumSoFar}
        </div>
      </div>
      {currentPlayer < activePlayers.length && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <label className="font-semibold" style={{ color: '#184d2b', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            {activePlayers[currentPlayer].name}, enter your bid (0-{round}):
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.5rem' }}>
            <input
              type="number"
              min={0}
              max={round}
              value={currentBid}
              onChange={e => setCurrentBid(e.target.value)}
              aria-label="Bid input"
              style={{ width: '80px', fontSize: '1.2rem', padding: '0.5rem', borderRadius: '8px', border: '2px solid #ffd700', background: '#fffde4', color: '#184d2b', textAlign: 'center', fontWeight: 700, boxShadow: '0 2px 8px rgba(44,62,80,0.08)' }}
            />
            <button className="btn btn-howto" style={{ fontSize: '1.1rem', padding: '0.7rem 1.5rem' }} onClick={handleBid}>Submit</button>
          </div>
          {bidStatus && (
            <div className="status" style={{ color: bidStatus === 'Underbid' ? '#388e3c' : '#d32f2f', fontWeight: 700, marginBottom: '0.5rem' }}>
              {bidStatus === 'Underbid' && 'Underbid: The sum is less than the round number.'}
              {bidStatus === 'Overbid' && 'Overbid: The sum is more than the round number.'}
            </div>
          )}
        </div>
      )}
      {error && <div className="error" style={{ marginTop: '0.5rem' }}>{error}</div>}
    </div>
  );
}