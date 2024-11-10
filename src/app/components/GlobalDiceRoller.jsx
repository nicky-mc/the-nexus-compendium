"use client";

import { useState, useEffect, useRef } from "react";

export default function GlobalDiceRoller() {
  const [log, setLog] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [diceCount, setDiceCount] = useState(1);
  const [bonus, setBonus] = useState(0);
  const logRef = useRef(null);

  const handleRoll = (type, count = 1) => {
    const max = parseInt(type.replace("d", ""));
    let total = 0;
    let results = [];
    for (let i = 0; i < count; i++) {
      let result;
      if (type === "d100" || type === "d%") {
        const units = Math.floor(Math.random() * 10);
        const tens = Math.floor(Math.random() * 10) * 10;
        result = tens + units === 0 ? 100 : tens + units;
      } else {
        result = Math.floor(Math.random() * max) + 1;
      }
      results.push(result);
      total += result;
    }
    total += parseInt(bonus);
    setLog((prev) => [...prev, `${type} (${results.join(", ")}${bonus ? ` + ${bonus}` : ""}): ${total}`]);
  };

  const clearLog = () => {
    setLog([]);
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 p-2 bg-yellow-600 text-white rounded-full shadow-lg z-50 font-poppins"
      >
        {isOpen ? "Close Dice Roller" : "Open Dice Roller"}
      </button>
      {isOpen && (
        <div className="fixed bottom-16 right-4 p-4 bg-yellow-100 border-4 border-yellow-600 rounded-lg shadow-lg w-96 z-50 font-poppins">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">Dice Roller</h2>
          <div className="flex flex-wrap gap-2 mb-4 text-black">
            {["d4", "d6", "d8", "d10", "d12", "d20", "d100", "d%"].map((type) => (
              <button
                key={type}
                onClick={() => handleRoll(type, diceCount)}
                className="p-2 bg-yellow-300 rounded hover:bg-yellow-400 shadow-md"
              >
                {type}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-yellow-800" htmlFor="diceCount">
              Number of Dice
            </label>
            <input
              type="number"
              id="diceCount"
              value={diceCount}
              onChange={(e) => setDiceCount(e.target.value)}
              className="w-full p-2 border border-yellow-600 rounded text-black"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-yellow-800" htmlFor="bonus">
              Bonus
            </label>
            <input
              type="number"
              id="bonus"
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
              className="w-full p-2 border border-yellow-600 rounded text-black"
            />
          </div>
          <div ref={logRef} className="overflow-y-auto max-h-32 bg-yellow-50 p-2 rounded mb-4 border border-yellow-600">
            <h3 className="text-lg font-semibold text-yellow-800">Roll Log:</h3>
            <ul className="list-disc list-inside text-black">
              {log.map((entry, idx) => (
                <li key={idx}>{entry}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={clearLog}
            className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 shadow-md"
          >
            Clear Log
          </button>
        </div>
      )}
    </>
  );
}