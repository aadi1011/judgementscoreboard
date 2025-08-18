import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Scoreboard from "./Scoreboard";
import BiddingForm from "./BiddingForm";
import TrickInput from "./TrickInput";
import RoundSummary from "./RoundSummary";

const TOTAL_ROUNDS = 13;

function getInitialPlayers() {
  const stored = localStorage.getItem("judgement_players");
  if (stored) {
    return JSON.parse(stored).map(name => ({
      name,
      score: 0,
      bid: null,
      wins: 0,
      eliminated: false,
    }));
  }
  return [];
}

function getWinners(players) {
  const maxScore = Math.max(...players.map(p => p.score));
  return players.filter(p => p.score === maxScore);
}


export default function Game() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState(getInitialPlayers());
  const [activePlayers, setActivePlayers] = useState(players);
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState("bidding"); // "bidding", "playing", "summary", "end"
  const [bids, setBids] = useState([]);
  const [tricks, setTricks] = useState([]);
  const [roundScores, setRoundScores] = useState([]);
  const [eliminated, setEliminated] = useState([]);
  const [confetti, setConfetti] = useState(false);
  const [biddingOrder, setBiddingOrder] = useState([]);
  const [showElimBanner, setShowElimBanner] = useState(false);
  const [elimModal, setElimModal] = useState(null);
  // const [elimRounds, setElimRounds] = useState([]);w
  let [elimRounds, setElimRounds] = useState([]);

  // Precompute elimination rounds based on starting player count
  useEffect(() => {
    const p = players.length;
    let rounds = [];
    // Judgement elimination logic: eliminate until 4 remain, based on deck constraints
    if (p === 5) rounds = [10];
    else if (p === 6) rounds = [8, 10];
    else if (p === 7) rounds = [6, 8, 10];
    else if (p === 8) rounds = [5, 7, 8, 10];
    // console.log('Elimination rounds setup:', { playerCount: p, elimRounds: rounds });
    // elimRounds(rounds);
    elimRounds = rounds;
    // console.log('L57:', { setElimRounds: elimRounds, elimRounds: rounds });
  }, [players.length]);

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("judgement_state");
    if (saved) {
      const state = JSON.parse(saved);
      setPlayers(state.players);
      setActivePlayers(state.activePlayers);
      setRound(state.round);
      setPhase(state.phase);
      setBids(state.bids);
      setTricks(state.tricks);
      setRoundScores(state.roundScores);
      setEliminated(state.eliminated);
      if (state.biddingOrder) setBiddingOrder(state.biddingOrder);
      if (state.elimRounds) setElimRounds(state.elimRounds); 
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("judgement_state", JSON.stringify({
      players, 
      activePlayers,
      round,
      phase,
      bids,
      tricks,
      roundScores,
      eliminated,
      biddingOrder,
      elimRounds,
    }));
  }, [players, activePlayers, round, phase, bids, tricks, roundScores, eliminated, biddingOrder, elimRounds]);

  // Show elimination banner if this is an elimination round (all phases)
  useEffect(() => {
    const isElim = elimRounds.includes(round);
    // console.log('Checking elimination banner:', { round, elimRounds, isElim });
    setShowElimBanner(isElim);
  }, [round, elimRounds]);

  // Compute bidding order for the round
  useEffect(() => {
    // Only use non-eliminated players
    const actives = players.filter(p => !p.eliminated);
    if (actives.length === 0) {
      setBiddingOrder([]);
      return;
    }
    // Rotate order: round 1 starts with player 1, round 2 with player 2, etc.
    const startIdx = (round - 1) % actives.length;
    const order = [];
    for (let i = 0; i < actives.length; i++) {
      order.push(actives[(startIdx + i) % actives.length]);
    }
    setBiddingOrder(order);
    setActivePlayers(actives);
  }, [round, players]);

  // End game confetti
  useEffect(() => {
    if (phase === "end") {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 4000);
    }
  }, [phase]);

  // Handle restart
  const handleRestart = () => {
    localStorage.removeItem("judgement_state");
    localStorage.removeItem("judgement_players");
    navigate("/setup");
  };

  // Bidding phase
  if (phase === "bidding") {
    return (
      <div className="centered-container animate-fade-in" style={{ minHeight: '100vh' }}>
        <div className="welcome-box" style={{ maxWidth: 700 }}>
          {showElimBanner && (
            <div style={{
              background: '#FF0000',
              color: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(44,62,80,0.18)',
              fontWeight: 700,
              fontSize: '1.15rem',
              padding: '1rem',
              marginBottom: '1.2rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}>
              <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>⚠️</span>
              This is an <span style={{ textDecoration: 'underline' }}>Elimination Round</span>! The player with the lowest score will be eliminated after this round.
            </div>
          )}
          <Scoreboard
            players={players}
          />
          <div style={{ marginTop: '2rem' }}>
            <BiddingForm
              round={round}
              activePlayers={biddingOrder}
              bids={bids}
              setBids={setBids}
              onComplete={bids => {
                // Map bids to correct player in rotation
                // bids: array in biddingOrder order
                // Update each player's bid property
                setPlayers(prevPlayers => prevPlayers.map(p => {
                  const idx = biddingOrder.findIndex(b => b.name === p.name);
                  return idx !== -1 ? { ...p, bid: bids[idx] } : { ...p, bid: null };
                }));
                setBids(bids);
                setPhase("playing");
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Playing phase
  if (phase === "playing") {
    return (
      <div className="centered-container animate-fade-in" style={{ minHeight: '100vh' }}>
        <div className="welcome-box" style={{ maxWidth: 700 }}>
          {showElimBanner && (
            <div style={{
              background: '#FF0000',
              color: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(44,62,80,0.18)',
              fontWeight: 700,
              fontSize: '1.15rem',
              padding: '1rem',
              marginBottom: '1.2rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}>
              <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>⚠️</span>
              This is an <span style={{ textDecoration: 'underline' }}>Elimination Round</span>! The player with the lowest score will be eliminated after this round.
            </div>
          )}
          <Scoreboard
            players={players}
            activePlayers={activePlayers}
            round={round}
            bids={bids}
            tricks={tricks}
            eliminated={eliminated}
          />
          <div style={{ marginTop: '2rem' }}>
            <TrickInput
              round={round}
              activePlayers={activePlayers}
              tricks={tricks}
              setTricks={setTricks}
              onComplete={tricks => {
                setTricks(tricks);
                // Calculate scores
                const newPlayers = players.map(p => {
                  if (p.eliminated) return p;
                  // Use bid from p.bid (set in bidding phase)
                  const bid = p.bid;
                  const wins = tricks.filter(w => w === p.name).length;
                  let delta = 0;
                  if (bid === 0 && wins === 0) delta = round;
                  else if (bid > 0 && bid === wins) delta = 2 * bid;
                  else delta = -Math.abs(bid - wins);
                  return {
                    ...p,
                    wins,
                    score: p.score + delta,
                    lastDelta: delta,
                  };
                });
                setPlayers(newPlayers);
                setRoundScores(newPlayers.map(p => ({
                  name: p.name,
                  bid: p.bid,
                  wins: p.wins,
                  delta: p.lastDelta,
                  score: p.score,
                  eliminated: p.eliminated,
                })));
                setPhase("summary");
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Round summary
  // Round summary
  if (phase === "summary") {
    // Check if elimination is needed after this round
    const isElimRound = elimRounds.includes(round);
    const shouldEliminate = isElimRound && activePlayers.length > 4;
    let elimPlayers = [];
    if (shouldEliminate) {
      const scores = activePlayers.map(p => p.score);
      const minScore = Math.min(...scores);
      elimPlayers = activePlayers.filter(p => p.score === minScore);
      // console.log('Elimination round:', round, 'Scores:', scores, 'Min:', minScore, 'Eliminated:', elimPlayers.map(p => p.name));
    }
    const handleNext = () => {
      // console.log('handleNext called', { round, shouldEliminate, elimPlayers, activePlayers });
      if (round === TOTAL_ROUNDS) {
        setPhase("end");
        return;
      }
      if (shouldEliminate && elimPlayers.length > 0) {
        setElimModal({
          names: elimPlayers.map(p => p.name),
          scores: elimPlayers.map(p => p.score),
          newCount: activePlayers.length - elimPlayers.length
        });
        setPlayers(prev => prev.map(p =>
          elimPlayers.some(e => e.name === p.name) ? { ...p, eliminated: true } : p
        ));
        setActivePlayers(prev => prev.filter(p => !elimPlayers.some(e => e.name === p.name)));
        setEliminated(prev => [...prev, ...elimPlayers.map(p => p.name)]);
        // console.log('Players after elimination:', players);
      } else {
        setBids([]);
        setTricks([]);
        setRoundScores([]);
        setPhase("bidding");
        setActivePlayers(players.filter(p => !p.eliminated));
        setRound(round + 1);
      }
    };
    const handleAcknowledgeElim = () => {
      setElimModal(null);
      setBids([]);
      setTricks([]);
      setRoundScores([]);
      setPhase("bidding");
      setActivePlayers(players.filter(p => !p.eliminated));
      setRound(round + 1);
    };
    return (
      <div className="centered-container animate-fade-in" style={{ minHeight: '100vh' }}>
        <div className="welcome-box" style={{ maxWidth: 700 }}>
          {showElimBanner && (
            <div style={{
              background: '#FF0000',
              color: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(44,62,80,0.18)',
              fontWeight: 700,
              fontSize: '1.15rem',
              padding: '1rem',
              marginBottom: '1.2rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}>
              <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>⚠️</span>
              This is an <span style={{ textDecoration: 'underline' }}>Elimination Round</span>! The player with the lowest score will be eliminated after this round.
            </div>
          )}
          <Scoreboard
            players={players}
            activePlayers={activePlayers}
            round={round}
            bids={bids}
            tricks={tricks}
            eliminated={eliminated}
          />
          <RoundSummary
            round={round}
            scores={roundScores}
            eliminated={eliminated}
            onNext={handleNext}
            onEndGame={() => {
              if (window.confirm("Are you sure you want to end the game now? This will show the winner based on current scores.")) {
                setPhase("end");
              }
            }}
          />
          {elimModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.45)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#FF0000', color: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', padding: '2rem 2.5rem', textAlign: 'center', fontWeight: 700, fontSize: '1.2rem', maxWidth: 350 }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🚫</span>
                {elimModal.names.length === 1 ? (
                  <>
                    Player <span style={{ textDecoration: 'underline', fontWeight: 800 }}>{elimModal.names[0]}</span> has been eliminated!<br />
                    Score: <span style={{ color: '#ffd700', fontWeight: 800 }}>{elimModal.scores[0]}</span><br />
                  </>
                ) : (
                  <>
                    Players <span style={{ textDecoration: 'underline', fontWeight: 800 }}>{elimModal.names.join(", ")}</span> have been eliminated!<br />
                    Scores: <span style={{ color: '#ffd700', fontWeight: 800 }}>{elimModal.scores.join(", ")}</span><br />
                  </>
                )}
                Continuing with <span style={{ color: '#ffd700', fontWeight: 800 }}>{elimModal.newCount}</span> players.<br />
                <button className="btn btn-howto" style={{ marginTop: '1.5rem', width: '100%' }} onClick={handleAcknowledgeElim}>Next Round</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // End game
  if (phase === "end") {
    const winners = getWinners(players);
    return (
      <div className="centered-container animate-fade-in" style={{ minHeight: '100vh' }}>
        <div className="welcome-box" style={{ maxWidth: 700, textAlign: 'center' }}>
          {confetti && (
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '5rem' }} className="animate-confetti">🎉</span>
              </div>
            </div>
          )}
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffd700', marginBottom: '1.2rem', fontFamily: 'Oswald, Roboto, Arial' }}>Game Over!</h2>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#184d2b', marginBottom: '1.2rem' }}>
            <span style={{ color: '#d32f2f', fontWeight: 700, fontSize: '2rem' }}>🏆</span> Winner{winners.length > 1 ? "s" : ""}: {winners.map(w => w.name).join(", ")}
          </h3>
          <Scoreboard
            players={players}
            activePlayers={activePlayers}
            round={round}
            bids={bids}
            tricks={tricks}
            eliminated={eliminated}
          />
          <div style={{ marginTop: '2rem', color: '#388e3c', fontSize: '1.2rem' }}>Thank you for playing!</div>
          <button
            className="btn btn-howto"
            style={{ marginTop: '2rem', width: '100%' }}
            onClick={handleRestart}
          >
            Restart Game
          </button>
        </div>
      </div>
    );
  }

  return null;
}