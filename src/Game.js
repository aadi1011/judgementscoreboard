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
    }));
  }, [players, activePlayers, round, phase, bids, tricks, roundScores, eliminated]);

  // Handle elimination after round 10 for 4-6 players
  useEffect(() => {
    if (round === 11 && players.length >= 4 && players.length <= 6 && eliminated.length === 0) {
      const scores = activePlayers.map(p => p.score);
      const minScore = Math.min(...scores);
      const idx = scores.indexOf(minScore);
      const elimPlayer = activePlayers[idx];
      setEliminated([elimPlayer.name]);
      setActivePlayers(activePlayers.filter((p, i) => i !== idx));
      setPlayers(players.map(p =>
        p.name === elimPlayer.name ? { ...p, eliminated: true } : p
      ));
    }
  }, [round, activePlayers, players, eliminated]);

  // Reset round state
  useEffect(() => {
    setBids([]);
    setTricks([]);
    setRoundScores([]);
    setPhase("bidding");
    setActivePlayers(players.filter(p => !p.eliminated));
  }, [round]);

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
      <div className="max-w-4xl mx-auto mt-8 animate-fade-in">
        <Scoreboard
          players={players}
          activePlayers={activePlayers}
          round={round}
          bids={bids}
          tricks={tricks}
          eliminated={eliminated}
        />
        <div className="mt-8">
          <BiddingForm
            round={round}
            activePlayers={activePlayers}
            bids={bids}
            setBids={setBids}
            onComplete={bids => {
              setBids(bids);
              setPhase("playing");
            }}
          />
        </div>
      </div>
    );
  }

  // Playing phase
  if (phase === "playing") {
    return (
      <div className="max-w-4xl mx-auto mt-8 animate-fade-in">
        <Scoreboard
          players={players}
          activePlayers={activePlayers}
          round={round}
          bids={bids}
          tricks={tricks}
          eliminated={eliminated}
        />
        <div className="mt-8">
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
                const idx = activePlayers.findIndex(a => a.name === p.name);
                const bid = idx !== -1 ? bids[idx] : null;
                const wins = tricks.filter(w => w === p.name).length;
                let delta = 0;
                if (bid === 0 && wins === 0) delta = round;
                else if (bid > 0 && bid === wins) delta = 2 * bid;
                else delta = -Math.abs(bid - wins);
                return {
                  ...p,
                  bid,
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
    );
  }

  // Round summary
  if (phase === "summary") {
    return (
      <div className="max-w-4xl mx-auto mt-8 animate-fade-in">
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
          onNext={() => {
            if (round === TOTAL_ROUNDS) {
              setPhase("end");
            } else {
              setRound(round + 1);
            }
          }}
        />
      </div>
    );
  }

  // End game
  if (phase === "end") {
    const winners = getWinners(players);
    return (
      <div className="max-w-3xl mx-auto mt-16 text-center animate-fade-in">
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-7xl animate-confetti">🎉</span>
            </div>
          </div>
        )}
        <h2 className="text-4xl font-bold text-yellow-400 mb-6">Game Over!</h2>
        <h3 className="text-2xl font-semibold text-white mb-4">
          Winner{winners.length > 1 ? "s" : ""}: {winners.map(w => w.name).join(", ")}
        </h3>
        <Scoreboard
          players={players}
          activePlayers={activePlayers}
          round={round}
          bids={bids}
          tricks={tricks}
          eliminated={eliminated}
        />
        <div className="mt-8 text-white text-lg">Thank you for playing!</div>
        <button
          className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-6 rounded-lg shadow transition"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      </div>
    );
  }

  return null;
}