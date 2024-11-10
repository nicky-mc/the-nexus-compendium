"use client";

import { useState, useEffect } from "react";

const diceSizes = {
  d4: "w-12 h-12",
  d6: "w-16 h-16",
  d8: "w-16 h-16",
  d10: "w-20 h-20",
  d12: "w-20 h-20",
  d20: "w-24 h-24",
  d100: "w-24 h-24",
  "d%": "w-24 h-24",
};

const diceFaces = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
  d100: 100,
  "d%": 10,
};

export default function Dice({ type, onRoll }) {
  const [value, setValue] = useState(1);
  const [tensValue, setTensValue] = useState(0);
  const maxFaces = diceFaces[type];

  const rollDice = () => {
    if (type === "d100" || type === "d%") {
      const units = Math.floor(Math.random() * 10);
      const tens = Math.floor(Math.random() * 10) * 10;
      const result = tens + units === 0 ? 100 : tens + units;
      setValue(units);
      setTensValue(tens);
      onRoll(result);
    } else {
      const result = Math.floor(Math.random() * maxFaces) + 1;
      setValue(result);
      onRoll(result);
    }
  };

  useEffect(() => {
    setValue(1);
    setTensValue(0);
  }, [type]);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative flex justify-center items-center perspective cursor-pointer ${diceSizes[type]} bg-gradient-to-b from-white to-gray-300 text-black shadow-md`}
        onClick={rollDice}
      >
        <div
          className="dice w-full h-full transform-style-preserve flex items-center justify-center"
          style={{
            transform: `rotateY(${(value - 1) * (360 / maxFaces)}deg)`,
          }}
        >
          {Array.from({ length: maxFaces }).map((_, idx) => (
            <div
              key={idx}
              className="face absolute w-full h-full flex items-center justify-center"
              style={{
                transform: getTransformForFace(type, idx),
              }}
            >
              <span className="text-2xl font-bold">{idx + 1}</span>
            </div>
          ))}
        </div>
        {type === "d100" || type === "d%" ? (
          <div
            className={`relative flex justify-center items-center perspective cursor-pointer ${diceSizes["d10"]} bg-gradient-to-b from-white to-gray-300 text-black shadow-md`}
            style={{ marginLeft: "1rem" }}
          >
            <div
              className="dice w-full h-full transform-style-preserve flex items-center justify-center"
              style={{
                transform: `rotateY(${(tensValue / 10) * (360 / 10)}deg)`,
              }}
            >
              {Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className="face absolute w-full h-full flex items-center justify-center"
                  style={{
                    transform: getTransformForFace("d10", idx),
                  }}
                >
                  <span className="text-2xl font-bold">{idx * 10}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <p className="text-center mt-2">{type}</p>
    </div>
  );
}

function getTransformForFace(type, index) {
  switch (type) {
    case "d6":
      return [
        "rotateX(0deg) translateZ(32px)", // 1
        "rotateY(180deg) translateZ(32px)", // 2
        "rotateX(90deg) translateZ(32px)", // 3
        "rotateX(-90deg) translateZ(32px)", // 4
        "rotateY(90deg) translateZ(32px)", // 5
        "rotateY(-90deg) translateZ(32px)", // 6
      ][index];
    case "d20":
      return `rotateX(${index * 18}deg) translateZ(32px)`;
    case "d4":
    case "d8":
    case "d10":
    case "d12":
    case "d100":
    case "d%":
      return `rotateX(${index * (360 / diceFaces[type])}deg) translateZ(32px)`;
    default:
      return "rotateX(0deg)";
  }
}