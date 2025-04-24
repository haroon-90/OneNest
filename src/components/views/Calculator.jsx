import React, { useState } from "react";
import { evaluate } from "mathjs";  // Import evaluate from mathjs

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleCalculate = () => {
    try {
      // Replace eval with mathjs' evaluate function
      setResult(evaluate(input));  
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="bg-[#1A1B1F] p-6 rounded-lg w-80 mx-auto text-white">
      <h2 className="text-center text-2xl font-bold mb-4">Calculator</h2>

      <div className="mb-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full p-4 text-center text-xl bg-[#333] text-white rounded-2xl mb-2"
        />
        {result && (
          <div className="text-center text-xl font-semibold bg-[#333] text-[#00FFAB] rounded-2xl p-4">
            = {result}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {["7", "8", "9", "/"].map((button, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(button)}
            className="bg-[#2F2F34] hover:bg-[#3c3c44] text-2xl font-semibold py-4 rounded-2xl transition"
          >
            {button}
          </button>
        ))}
        {["4", "5", "6", "*"].map((button, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(button)}
            className="bg-[#2F2F34] hover:bg-[#3c3c44] text-2xl font-semibold py-4 rounded-2xl transition"
          >
            {button}
          </button>
        ))}
        {["1", "2", "3", "-"].map((button, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(button)}
            className="bg-[#2F2F34] hover:bg-[#3c3c44] text-2xl font-semibold py-4 rounded-2xl transition"
          >
            {button}
          </button>
        ))}
        {["C", "0", "=", "+"].map((button, idx) => (
          <button
            key={idx}
            onClick={button === "C" ? handleClear : button === "=" ? handleCalculate : () => handleClick(button)}
            className={`bg-[#2F2F34] hover:bg-[#3c3c44] text-2xl font-semibold py-4 rounded-2xl transition ${button === "C" ? "bg-red-500" : ""
              }${button === "=" ? "bg-amber-500" : ""
              }`}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
