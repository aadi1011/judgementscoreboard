
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
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffd700', marginBottom: '1rem', fontFamily: 'Oswald, Roboto, Arial' }}>Round {round} - Trick Winners</h3>
      <div className="status" style={{ marginBottom: '1rem', color: '#184d2b', fontWeight: 600 }}>
        Tricks completed: {tricks.length} / {round}
      </div>
      {currentTrick < round && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <label className="font-semibold" style={{ color: '#184d2b', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            Trick {currentTrick + 1}: Who won?
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.5rem' }}>
            <select
              value={winner}
              onChange={e => setWinner(e.target.value)}
              aria-label="Trick winner select"
              style={{ width: '180px', fontSize: '1.1rem', padding: '0.5rem', borderRadius: '8px', border: '2px solid #ffd700', background: '#fffde4', color: '#184d2b', fontWeight: 600, boxShadow: '0 2px 8px rgba(44,62,80,0.08)' }}
            >
              <option value="">Select player</option>
              {activePlayers.map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>
            <button className="btn btn-howto" style={{ fontSize: '1.1rem', padding: '0.7rem 1.5rem' }} onClick={handleTrick}>Submit</button>
          </div>
        </div>
      )}
      {error && <div className="error" style={{ marginTop: '0.5rem' }}>{error}</div>}
    </div>
  );
}