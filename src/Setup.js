
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
    <div className="centered-container animate-fade-in">
      <div className="welcome-box" style={{ maxWidth: 500 }}>
        <h2 style={{ fontFamily: 'Oswald, Roboto, Arial', fontWeight: 700, fontSize: '2rem', color: '#184d2b', marginBottom: '1.5rem', textAlign: 'center' }}>Game Setup</h2>
        <div style={{ width: '100%', marginBottom: '1.2rem' }}>
          <label className="font-semibold" style={{ color: '#184d2b', marginBottom: '0.5rem', display: 'block' }}>Number of Players:</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                className={`btn ${numPlayers === i + 4 ? 'btn-howto' : 'btn-secondary'}`}
                style={{ minWidth: 38 }}
                onClick={() => handleNumPlayers(i + 4)}
              >
                {i + 4}
              </button>
            ))}
          </div>
        </div>
        <div style={{ width: '100%', marginBottom: '1.2rem' }}>
          <label className="font-semibold" style={{ color: '#184d2b', marginBottom: '0.5rem', display: 'block' }}>Player Names:</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {names.map((name, i) => (
              <input
                key={i}
                type="text"
                placeholder={name}
                onChange={e => handleNameChange(i, e.target.value)}
                aria-label={`Player ${i + 1} name`}
                style={{ width: '120px', fontSize: '1rem', padding: '0.5rem', borderRadius: '8px', border: '1.5px solid #b2dfdb', background: '#f6fff7', color: '#184d2b', marginBottom: '0.5rem' }}
              />
            ))}
          </div>
        </div>
        {error && <div className="error" style={{ marginBottom: '1rem' }}>{error}</div>}
        <button className="btn btn-start" style={{ width: '100%', marginTop: '0.5rem' }} onClick={handleBegin}>Begin Game</button>
      </div>
    </div>
  );
}