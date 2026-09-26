import React, { useState } from "react";

export default function TrickInput({ round, activePlayers, tricks, setTricks, onComplete }) {
  const currentTrick = tricks.length;
  const [winner, setWinner] = useState("");
  const [error, setError] = useState("");
  const [showUndoConfirm, setShowUndoConfirm] = useState(false);

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
    }
  };

  const requestUndo = () => {
    if (tricks.length === 0) return;
    setShowUndoConfirm(true);
  };

  const confirmUndo = () => {
    const newTricks = tricks.slice(0, -1);
    setTricks(newTricks);
    setWinner("");
    setError("");
    setShowUndoConfirm(false);
  };

  const cancelUndo = () => {
    setShowUndoConfirm(false);
  };

  const lastWinner = tricks.length > 0 ? tricks[tricks.length - 1] : null;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffd700', marginBottom: '1rem', fontFamily: 'Oswald, Roboto, Arial' }}>Round {round} - Game Winners</h3>
      <div className="status" style={{ marginBottom: '1rem', color: '#184d2b', fontWeight: 600 }}>
        Games completed: {tricks.length} / {round}
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
              aria-label="Game winner select"
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0.75rem' }}>
        {lastWinner && (
          <div style={{ color: '#184d2b', fontWeight: 500, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
            Last recorded winner: <strong>{lastWinner}</strong>
          </div>
        )}
        <button
          type="button"
          className="btn btn-howto"
          style={{ fontSize: '1rem', padding: '0.5rem 1.2rem', background: tricks.length === 0 ? '#ccc' : undefined, cursor: tricks.length === 0 ? 'not-allowed' : 'pointer' }}
          onClick={requestUndo}
          disabled={tricks.length === 0}
        >
          Undo Last Trick
        </button>
      </div>
      {showUndoConfirm && (
        <div
          role="dialog"
          aria-label="Confirm undo last trick"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div style={{ background: '#fffde4', borderRadius: '12px', padding: '1.5rem', maxWidth: '360px', width: '90%', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <p style={{ color: '#184d2b', fontWeight: 600, marginBottom: '1rem' }}>
              Undo the last recorded winner{lastWinner ? ` (${lastWinner})` : ""}?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button type="button" className="btn btn-howto" onClick={confirmUndo}>Yes, Undo</button>
              <button type="button" className="btn" onClick={cancelUndo}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
