import React from "react";
import { useNavigate } from "react-router-dom";

export default function HowToPlay() {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto bg-green-800 bg-opacity-90 rounded-xl p-8 mt-8 text-white shadow-xl animate-fade-in">
      <h2 className="text-3xl font-bold mb-4">How to Play</h2>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Setup</h3>
        <ul className="list-disc ml-6">
          <li>Players: 1-8 players.</li>
          <li>Standard 52-card deck (no jokers).</li>
          <li>Rounds: 1 to 13. Each round, players get n cards (not simulated).</li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Bidding</h3>
        <ul className="list-disc ml-6">
          <li>Each player bids how many tricks they will win (0 to n).</li>
          <li>Bids are input sequentially (player 1 to last).</li>
          <li>The sum of all bids <b>MUST NOT</b> equal n. The app enforces this for the last bidder.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Playing</h3>
        <ul className="list-disc ml-6">
          <li>For each trick, select who won from the dropdown.</li>
          <li>Special for round 13 with 4 players: No trump, first card sets suit (not tracked in app).</li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Scoring</h3>
        <ul className="list-disc ml-6">
          <li>If bid = 0 and wins = 0: +n points.</li>
          <li>If bid &gt; 0 and bid = wins: +2 × bid points.</li>
          <li>Otherwise: -|bid - wins| points.</li>
          <li>Scores are cumulative across rounds.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Elimination</h3>
        <ul className="list-disc ml-6">
          <li>For 4-6 players, after round 10: Eliminate the player with the lowest score (if tie, eliminate first in order).</li>
          <li>Eliminated players can't participate in rounds 11-13, but their scores remain visible.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">End Game</h3>
        <ul className="list-disc ml-6">
          <li>After round 13, the player(s) with the highest score win.</li>
          <li>App shows a celebratory message and option to restart.</li>
        </ul>
      </section>
      <button
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-6 rounded-lg shadow transition"
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
}