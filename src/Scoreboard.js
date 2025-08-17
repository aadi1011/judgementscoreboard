import React from "react";

export default function Scoreboard({ players, activePlayers, round, bids, tricks, eliminated }) {
  return (
    <div className="bg-green-900 bg-opacity-90 rounded-xl p-4 shadow-lg">
      <h3 className="text-xl font-bold text-yellow-300 mb-2">Scoreboard</h3>
      <table className="w-full text-white text-center border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="px-2">Player</th>
            <th className="px-2">Score</th>
            <th className="px-2">Bid</th>
            <th className="px-2">Wins</th>
            <th className="px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, i) => (
            <tr key={p.name} className={p.eliminated ? "opacity-60" : ""}>
              <td className="font-semibold">{p.name}</td>
              <td>{p.score}</td>
              <td>{p.bid !== null ? p.bid : "-"}</td>
              <td>{p.wins !== null ? p.wins : "-"}</td>
              <td>
                {p.eliminated
                  ? <span className="text-red-400 font-bold">Eliminated</span>
                  : <span className="text-green-300 font-bold">Active</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {eliminated.length > 0 && (
        <div className="mt-2 text-red-400 font-bold">
          Eliminated: {eliminated.join(", ")}
        </div>
      )}
    </div>
  );
}