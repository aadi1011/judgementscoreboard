import React, { useState } from "react";

export default function Scoreboard({ players }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div style={{ marginBottom: '2rem', width: 'auto' }}>
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{
          display: 'block',
          margin: '0 auto 1rem auto',
          background: '#ffe082',
          color: '#184d2b',
          fontWeight: 700,
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
          padding: '0.6rem 1.5rem',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        aria-expanded={!collapsed}
        aria-controls="scoreboard-content"
      >
        {collapsed ? 'Show Scoreboard' : 'Hide Scoreboard'}
      </button>
      {!collapsed && (
        <div id="scoreboard-content" style={{
          width: 'fit-content',
          borderRadius: '16px',
          boxShadow: '0 2px 12px rgba(44,62,80,0.10)',
          background: 'linear-gradient(90deg, #ffe082 0%, #ffe082 100%)',
          padding: '1.5rem',
          fontSize: '1.15rem',
          fontFamily: 'Roboto, Arial',
          overflowX: 'auto',
        }}>
          <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1rem', color: '#222', fontFamily: 'Oswald, Roboto, Arial', textAlign: 'center' }}>Scoreboard</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 3fr 1fr',
            fontWeight: 700,
            color: '#184d2b',
            borderBottom: '2px solid #ffd700',
            paddingBottom: '0.7rem',
            marginBottom: '0.7rem',
            textAlign: 'center',
          }}>
            <span>Player</span>
            <span>Score</span>
            <span>Status</span>
          </div>
          {players.map((p, idx) => (
            <div key={p.name} style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              alignItems: 'center',
              background: idx % 2 === 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.65)',
              color: p.eliminated ? '#d32f2f' : '#184d2b',
              fontWeight: p.eliminated ? 700 : 500,
              borderRadius: '8px',
              marginBottom: '0.3rem',
              padding: '0.6rem',
              boxShadow: p.eliminated ? '0 0 8px #d32f2f33' : 'none',
              letterSpacing: '0.02em',
            }}>
              <span style={{ fontFamily: 'Oswald, Roboto, Arial', fontSize: '1.1rem' }}>{p.name}</span>
              <span style={{ fontWeight: 700 }}>{p.score}</span>
              <span style={{ fontWeight: 700 }}>{p.eliminated ? 'Eliminated' : 'Active'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
    