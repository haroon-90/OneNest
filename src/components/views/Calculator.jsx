import React, { useState } from "react";
import { evaluate } from "mathjs";
import { useTheme } from "../../context/ThemeContext";

const Calculator = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
      setResult(evaluate(input));
    } catch (error) {
      setResult("Error");
    }
  };

  const buttonClasses = "text-2xl font-semibold py-4 rounded-2xl transition";

  return (
    <div
      className="p-6 rounded-lg w-80 mx-auto"
      style={{
        backgroundColor: isDark ? "#1A1B1F" : "#f2f2f2",
        color: isDark ? "#ffffff" : "#000000",
      }}
    >
      <h2 className="text-center text-2xl font-bold mb-4">Calculator</h2>

      <div className="mb-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full p-4 text-center text-xl rounded-2xl mb-2"
          style={{
            backgroundColor: isDark ? "#333" : "#e0e0e0",
            color: isDark ? "#ffffff" : "#000000",
          }}
        />
        {result && (
          <div
            className="text-center text-xl font-semibold rounded-2xl p-4"
            style={{
              backgroundColor: isDark ? "#333" : "#e0e0e0",
              color: isDark ? "white" : "black",
            }}
          >
            = {result}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {["7", "8", "9", "/"].map((button, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(button)}
            className={`${buttonClasses}`}
            style={{
              backgroundColor: isDark ? "#2F2F34" : "#d6d6d6",
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            {button}
          </button>
        ))}
        {["4", "5", "6", "*"].map((button, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(button)}
            className={`${buttonClasses}`}
            style={{
              backgroundColor: isDark ? "#2F2F34" : "#d6d6d6",
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            {button}
          </button>
        ))}
        {["1", "2", "3", "-"].map((button, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(button)}
            className={`${buttonClasses}`}
            style={{
              backgroundColor: isDark ? "#2F2F34" : "#d6d6d6",
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            {button}
          </button>
        ))}
        {["C", "0", "=", "+"].map((button, idx) => (
          <button
            key={idx}
            onClick={
              button === "C"
                ? handleClear
                : button === "="
                ? handleCalculate
                : () => handleClick(button)
            }
            className={`${buttonClasses}`}
            style={{
              backgroundColor:
                button === "C"
                  ? "#ff4c4c"
                  : button === "="
                  ? "#ffc107"
                  : isDark
                  ? "#2F2F34"
                  : "#d6d6d6",
              color: button === "C" || button === "=" ? "#000000" : isDark ? "#ffffff" : "#000000",
            }}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
