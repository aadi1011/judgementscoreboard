
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const pages = [
  {
    title: "How to Play: Setup & Bidding",
    sections: [
      {
        heading: "Setup",
        items: [
          "Players: 4-8 players (minimum 4 enforced).",
          "Standard 52-card deck (no jokers).",
          "Rounds: 1 to 13. Each round, players get n cards (not simulated)."
        ]
      },
      {
        heading: "Bidding",
        items: [
          "Each player bids how many tricks they will win (0 to n).",
          "Bids are input sequentially (player 1 to last, rotating each round).",
          "The sum of all bids MUST NOT equal n. The app enforces this for the last bidder."
        ]
      }
    ]
  },
  {
    title: "How to Play: Playing, Scoring, Eliminations & End Game",
    sections: [
      {
        heading: "Playing",
        items: [
          "For each trick, select who won from the dropdown (only active players).",
          "Special for round 13 with 4 players: No trump, first card sets suit (not tracked in app)."
        ]
      },
      {
        heading: "Scoring",
        items: [
          "If bid = 0 and wins = 0: +n points.",
          "If bid > 0 and bid = wins: +2 × bid points.",
          "Otherwise: -|bid - wins| points.",
          "Scores are cumulative across rounds."
        ]
      },
      {
        heading: "Elimination Logic",
        items: [
          "Eliminations occur after specific rounds to ensure no round exceeds 52 cards (n × p ≤ 52).",
          "Elimination rounds by starting player count:",
          "- 4 players: No eliminations.",
          "- 5 players: Eliminate after round 10 (to 4 players).",
          "- 6 players: Eliminate after rounds 8 (to 5) and 10 (to 4).",
          "- 7 players: Eliminate after rounds 7 (to 6), 8 (to 5), and 10 (to 4).",
          "- 8 players: Eliminate after rounds 6 (to 7), 7 (to 6), 8 (to 5), and 10 (to 4).",
          "After an elimination round, the active player with the lowest cumulative score is eliminated (ties broken by player order).",
          "Eliminated players keep their scores but are removed from bidding, playing, and future eliminations.",
          "During an elimination round, a red banner is shown: 'This is an Elimination Round! The player with the lowest score will be eliminated after this round.'",
          "After scoring, if elimination occurs, a modal/alert is shown: 'Player X has been eliminated due to low score.'"
        ]
      },
      {
        heading: "End Game",
        items: [
          "After round 13, the player(s) with the highest score win.",
          "App shows a celebratory message and option to restart."
        ]
      }
    ]
  }
];

export default function HowToPlay() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const current = pages[page];
  return (
    <div className="centered-container animate-fade-in" style={{ minHeight: '100vh' }}>
      <div className="welcome-box" style={{ maxWidth: 600, alignItems: 'stretch', padding: '2.2rem 1.5rem' }}>
        <h2 style={{ fontFamily: 'Oswald, Roboto, Arial', fontWeight: 700, fontSize: '2rem', color: '#184d2b', marginBottom: '1.2rem', textAlign: 'center' }}>{current.title}</h2>
        {current.sections.map((section, idx) => (
          <section key={idx} style={{ marginBottom: '1.2rem', background: '#f6fff7', borderRadius: '10px', padding: '1rem 1.2rem', boxShadow: '0 2px 8px rgba(44,62,80,0.08)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#388e3c', marginBottom: '0.5rem', fontFamily: 'Oswald, Roboto, Arial' }}>{section.heading}</h3>
            <ul style={{ marginLeft: '1.2rem', color: '#184d2b', fontSize: '1rem', fontWeight: 500, paddingLeft: '1rem', listStyle: 'disc' }}>
              {section.items.map((item, i) => (
                <li key={i} style={{ marginBottom: '0.3rem' }}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', gap: '1rem' }}>
          <button
            className="btn btn-howto"
            style={{ flex: 1, fontSize: '1.1rem', padding: '0.7rem 1.5rem' }}
            onClick={() => page === 0 ? navigate("/") : setPage(page - 1)}
          >
            {page === 0 ? "Back" : "Previous"}
          </button>
          <button
            className="btn btn-howto"
            style={{ flex: 1, fontSize: '1.1rem', padding: '0.7rem 1.5rem' }}
            onClick={() => page === pages.length - 1 ? navigate("/") : setPage(page + 1)}
          >
            {page === pages.length - 1 ? "Home" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}