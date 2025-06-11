// File: src/components/Header.jsx
import React from "react";
import Logo from "../assets/Logo/OneNest_logo.svg";
import { FaSun, FaMoon} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`${theme === "dark" ? "bg-[#1E1F24] text-white" : "bg-amber-50 text-black"} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <div className="flex items-center space-x-2 hover:scale-105 transition">
          <img src={Logo} alt="OneNest Logo" className="h-12 cursor-pointer" onClick={() => window.location.reload()} />
        </div>

        <nav className="hidden md:flex space-x-6">
          <a href="#" className={`${theme === 'dark' ? "text-white" : "text-black"} hover:text-[#25d366] transition`}>Your Mini App Universe</a>
          {/* <a href="#" className={`${theme === 'dark' ? "text-white" : "text-black"} hover:text-[#25d366] transition`}>Tools</a>
          <a href="#" className={`${theme === 'dark' ? "text-white" : "text-black"} hover:text-[#25d366] transition`}>About</a>
          <a href="#" className={`${theme === 'dark' ? "text-white" : "text-black"} hover:text-[#25d366] transition`}>Contact</a> */}
        </nav>

        <div className="block">
          <button
            onClick={toggleTheme}
            className="bg-[#25d366] hover:bg-[#2dfcb4] text-black font-bold py-2 px-4 rounded-full transition"
          >
            {theme === "dark" ? <FaSun/> : <FaMoon color="white"/>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
