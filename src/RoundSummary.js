import React from "react";

export default function RoundSummary({ round, scores, eliminated, onNext }) {
  return (
    <div className="bg-green-900 bg-opacity-90 rounded-xl p-6 shadow-lg max-w-md mx-auto text-white">
      <h3 className="text-xl font-bold text-yellow-300 mb-4">Round {round} Summary</h3>
      <ul className="mb-4">
        {scores.map(s => (
          <li key={s.name} className={s.eliminated ? "opacity-60" : ""}>
            <span className="font-semibold">{s.name}</span>: Bid {s.bid}, Won {s.wins}, Score Change {s.delta > 0 ? "+" : ""}{s.delta}, Total {s.score}
            {s.eliminated && <span className="ml-2 text-red-400 font-bold">Eliminated</span>}
          </li>
        ))}
      </ul>
      {eliminated.length > 0 && (
        <div className="mb-4 text-red-400 font-bold">
          Eliminated this round: {eliminated.join(", ")}
        </div>
      )}
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-6 rounded-lg shadow transition"
        onClick={onNext}
      >
        {round === 13 ? "End Game" : "Next Round"}
      </button>
    </div>
  );
}