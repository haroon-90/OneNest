import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Dashboard = () => {
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "#1E1F24" : "#FFFFFF";
  const textColor = theme === "dark" ? "white" : "black";
  const cardBgColor = theme === "dark" ? "#2A2B30" : "#F0F0F0";
  const shadowColor = theme === "dark" ? "shadow-xl" : "shadow";
  const textGray = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div className="p-8 rounded-lg" style={{ backgroundColor: bgColor, color: textColor }}>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        Welcome to OneNest Dashboard!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className={`p-6 rounded-xl ${shadowColor} hover:shadow-xl transition`}
          style={{ backgroundColor: cardBgColor }}
        >          <h2 className="text-xl font-semibold mb-2">🧠 Logic Games</h2>
          <p className={`text-sm ${textGray}`}>
            Challenge your brain with TicTacToe, CardClash, Color Memory and Word Guess.
          </p>
        </div>

        <div
          className={`p-6 rounded-xl ${shadowColor} hover:shadow-xl transition`}
          style={{ backgroundColor: cardBgColor }}
        >          <h2 className="text-xl font-semibold mb-2">🛠️ Tools</h2>
          <p className={`text-sm ${textGray}`}>
            Use quick utilities like Calculator, Stopwatch, and more.
          </p>
        </div>

        <div
          className={`p-6 rounded-xl ${shadowColor} hover:shadow-xl transition`}
          style={{ backgroundColor: cardBgColor }}
        >          <h2 className="text-xl font-semibold mb-2">🎧 Fun Zone</h2>
          <p className={`text-sm ${textGray}`}>
            Flip Coin, Roll Dice, and chill with our Music Player.
          </p>
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        Developed with ❤️ by Haroon | Tech Dastak
      </div>

    </div>
  );
};

export default Dashboard;
