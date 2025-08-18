import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header
      style={{
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 200,
        background: 'linear-gradient(180deg, #ffe082 0%, #faf2abff 100%)',
        boxShadow: '0 2px 12px rgba(44,62,80,0.10)',
        padding: '0.7rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontFamily: 'Oswald, Roboto, Arial',
      }}
    >
      {/* Left side: Home Button */}
      <div style={{ position: 'absolute', left: '1rem' }}>
        {location.pathname !== '/' && (
          <button
            className="btn btn-howto"
            style={{
              fontSize: '1.1rem',
              padding: '0.5rem 1.2rem',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
            }}
            onClick={() => navigate('/')}
            aria-label="Home"
          >
            🏠 Home
          </button>
        )}
      </div>

      {/* Center: Title */}
      <div
        style={{
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#184d2b',
          letterSpacing: '0.03em',
          textAlign: 'center',
        }}
      >
        One Card (Judgement) Game Scoreboard
      </div>
    </header>
  );
}
