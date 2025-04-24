import React from "react";
import { useTheme } from "../../context/ThemeContext";

const About = () => {
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "#1A1B1F" : "#FFFFFF";
  const textColor = theme === "dark" ? "white" : "black";
  const cardBgColor = theme === "dark" ? "#2A2B30" : "#F0F0F0";
  const shadowColor = theme === "dark" ? "shadow-xl" : "shadow";
  const textGray = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div className="p-8 rounded-lg" style={{ backgroundColor: bgColor, color: textColor }}>
      <h1 className="text-3xl font-bold mb-6">About OneNest</h1>

      <p className={`text-lg leading-relaxed ${textGray}`}>
        <strong>OneNest</strong> is your all-in-one digital hub designed for simplicity,
        speed, and productivity. Whether you're a student, developer, or
        productivity geek, OneNest brings together the tools you need — all in one place.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-5 rounded-lg hover:shadow-xl transition ${shadowColor}`} style={{ backgroundColor: cardBgColor }}>
          <h2 className="text-xl font-semibold mb-2">🎯 Our Goal</h2>
          <p className={`${textGray}`}>
            Empower users with smart, simple, and useful tools to save time and enhance creativity.
          </p>
        </div>

        <div className={`p-5 rounded-lg hover:shadow-xl transition ${shadowColor}`} style={{ backgroundColor: cardBgColor }}>
          <h2 className="text-xl font-semibold mb-2">🛠 What We Offer</h2>
          <p className={`${textGray}`}>
            From calculators to fun games and AI-powered advice, OneNest offers a versatile set of tools under one clean UI.
          </p>
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        Developed with ❤️ by Haroon | Tech Dastak
      </div>
    </div>
  );
};

export default About;
