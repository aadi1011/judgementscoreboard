import React from "react";

export default function RoundSummary({ round, scores, eliminated, onNext, onEndGame }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffd700', marginBottom: '1rem', fontFamily: 'Oswald, Roboto, Arial' }}>Round {round} Summary</h3>
      <ul style={{ width: '100%', marginBottom: '1.2rem', listStyle: 'none', padding: 0 }}>
        {scores.map(s => (
          <li key={s.name} style={{ marginBottom: '0.5rem', padding: '0.7rem 1rem', borderRadius: '10px', background: s.eliminated ? '#ffeaea' : '#f6fff7', color: s.eliminated ? '#b71c1c' : '#184d2b', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{s.name}</span>
            <span style={{ fontWeight: 500, fontSize: '1rem' }}>Bid {s.bid}, Won {s.wins}</span>
            <span style={{ fontWeight: 700, color: s.delta > 0 ? '#388e3c' : '#d32f2f' }}>{s.delta > 0 ? '+' : ''}{s.delta}</span>
            <span style={{ fontWeight: 700, color: '#ffd700' }}>Total {s.score}</span>
            {s.eliminated && <span style={{ marginLeft: '1rem', color: '#b71c1c', fontWeight: 700 }}>Eliminated</span>}
          </li>
        ))}
      </ul>
      {eliminated.length > 0 && (
        <div className="error" style={{ marginBottom: '1rem', color: '#b71c1c', fontWeight: 700 }}>
          Eliminated this round: {eliminated.join(", ")}
        </div>
      )}
      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <button className="btn btn-howto" style={{ flex: 1, marginTop: '0.5rem' }} onClick={onNext}>
          {round === 13 ? "End Game" : "Next Round"}
        </button>
        <button className="btn btn-start" style={{ flex: 1, marginTop: '0.5rem' }} onClick={onEndGame}>
          End Game
        </button>
      </div>
    </div>
  );
}