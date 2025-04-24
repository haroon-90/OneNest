import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Tools = () => {
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "#1A1B1F" : "#FFFFFF";
  const textColor = theme === "dark" ? "white" : "black";
  const cardBgColor = theme === "dark" ? "#2A2B30" : "#F0F0F0";
  const shadowColor = theme === "dark" ? "shadow-xl" : "shadow";
  const textGray = theme === "dark" ? "text-gray-400" : "text-gray-600";

  const tools = [
    { name: "Tic Tac Toe", desc: "Best two player mind game." },
    { name: "Calculator", desc: "Basic math operations at your fingertips." },
    { name: "Stopwatch", desc: "Track your time with ease." },
    { name: "Roll Dice", desc: "Roll a random dice and try your luck." },
    { name: "Flip Coin", desc: "Heads or Tails? Let’s decide!" },
    { name: "Music Player", desc: "Play your favorite tracks." },
    { name: "AI Advice", desc: "Get smart advice from our AI." },
  ];

  return (
    <div className="p-8 rounded-lg" style={{ backgroundColor: bgColor, color: textColor }}>
      <h1 className="text-3xl font-bold mb-8">Here are our best Tools!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl transition transform hover:shadow-xl ${cardBgColor} ${shadowColor}`}
            style={{ backgroundColor: cardBgColor }}
          >
            <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
            <p className={`text-sm ${textGray}`}>{tool.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-sm text-gray-500">
        Developed with ❤️ by Haroon | Tech Dastak
      </div>
    </div>
  );
};

export default Tools;
