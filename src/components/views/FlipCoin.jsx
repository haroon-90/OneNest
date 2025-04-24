import React, { useState } from "react";

const FlipCoin = () => {
  const [side, setSide] = useState("coin");
  const [flipping, setFlipping] = useState(false);

  const flipCoin = () => {
    setFlipping(true);
    const outcomes = ["Heads", "Tails"];
    const result = outcomes[Math.floor(Math.random() * outcomes.length)];

    setTimeout(() => {
      setSide(result);
      setFlipping(false);
    }, 400);
  };

  return (
    <div className="text-center text-white bg-[#313234] p-6 rounded-lg shadow-lg max-w-md mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">🪙 Flip a Coin</h2>

      <div className="w-32 h-32 mx-auto mb-4">
        <div
          className={`w-full h-full rounded-full flex items-center justify-center text-2xl font-semibold border-4 transition-transform duration-400 ease-in-out ${flipping ? "rotate-y-180 translate-y-[-10px]" : "" } ${side === "Heads" ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}`}
        >
          {!flipping ? side : "🪙"}
        </div>
      </div>

      <button
        onClick={flipCoin}
        disabled={flipping}
        className="bg-[#25d366] hover:bg-[#00e19e] text-black font-semibold px-6 py-2 rounded-full transition disabled:opacity-50"
      >
        {flipping ? "Flipping..." : "Flip Coin"}
      </button>
    </div>
  );
};

export default FlipCoin;
