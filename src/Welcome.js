import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] animate-fade-in">
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">Judgement Card Game Scoreboard</h1>
      <div className="flex gap-6">
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 px-8 rounded-lg shadow-lg transition text-xl"
          onClick={() => navigate("/setup")}
        >
          Start Game
        </button>
        <button
          className="bg-white hover:bg-gray-200 text-green-900 font-bold py-3 px-8 rounded-lg shadow-lg transition text-xl"
          onClick={() => navigate("/howto")}
        >
          How to Play
        </button>
      </div>
      <div className="mt-12">
        <img src="/logo192.png" alt="Cards" className="w-32 h-32 opacity-80 animate-bounce" />
      </div>
    </div>
  );
}