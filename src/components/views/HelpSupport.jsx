import React from "react";
import { useTheme } from "../../context/ThemeContext";

const HelpSupport = () => {
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "#1A1B1F" : "#FFFFFF";
  const textColor = theme === "dark" ? "white" : "black";
  const cardText = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const listText = theme === "dark" ? "text-gray-400" : "text-gray-700";

  return (
    <div className="p-8 rounded-lg" style={{ backgroundColor: bgColor, color: textColor }}>
      <h1 className="text-3xl font-bold mb-6">🛟 Help & Support</h1>
      <p className={`text-lg ${cardText}`}>
        Need help using OneNest? You're in the right place!
      </p>

      <ul className={`mt-6 list-disc list-inside space-y-2 ${listText}`}>
        <li>Explore each tool by navigating through the menu.</li>
        <li>
          For bugs or issues, contact us at{" "}
          <a
            href="mailto:techdastak2@gmail.com"
            className="text-[#25d366] hover:underline"
          >
            techdastak2@gmail.com
          </a>
        </li>
        <li>Make sure your browser supports modern JavaScript features.</li>
        <li>Updates are automatic — just refresh and enjoy new tools.</li>
      </ul>

      <div className="mt-10 text-sm text-gray-500">
        Developed with ❤️ by Haroon | Tech Dastak
      </div>
    </div>
  );
};

export default HelpSupport;
