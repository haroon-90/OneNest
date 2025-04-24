// File: src/components/Footer.jsx
import React from "react";
import Logo from "../assets/Logo/OneNest_logo.svg";
import Dashboard from "./views/Dashboard";
import About from "./views/About";
import HelpSupport from "./views/HelpSupport";
import Tools from "./views/Tools";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const Footer = () => {
  const [activeComponent, setActiveComponent] = useState("");
  const { theme } = useTheme();

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "About":
        return <About />;
      case "HelpSupport":
        return <HelpSupport />;
      case "Tools":
        return <Tools />;
      default:
        return;
    }
  };

  return (
    <footer className={`${theme === "dark" ? "bg-[#1E1F24] text-white" : "bg-amber-50 text-black"} shadow-md mt-20 py-5`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="mb-6 md:mb-0">
            <img src={Logo} alt="OneNest Logo" className="h-12 mb-4" />
            <p className="text-sm leading-relaxed">
              Your all-in-one digital hub for productivity, tools, and creativity. Built to keep it simple, smart, and seamless.
            </p>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className={`${theme === 'dark' ? "text-white" : "text-black"} font-semibold text-lg mb-4`}>Quick Links</h3>
            <ul className="space-y-3">
              <li><button onClick={() => setActiveComponent("Dashboard")} className="hover:text-[#25d366] transition-colors duration-200">Dashboard</button></li>
              <li><button onClick={() => setActiveComponent("Tools")} className="hover:text-[#25d366] transition-colors duration-200">Tools</button></li>
              <li><button onClick={() => setActiveComponent("About")} className="hover:text-[#25d366] transition-colors duration-200">About Us</button></li>
              <li><button onClick={() => setActiveComponent("HelpSupport")} className="hover:text-[#25d366] transition-colors duration-200">Help & Support</button></li>
            </ul>
          </div>

          <div>
            <h3 className={`${theme === 'dark' ? "text-white" : "text-black"} font-semibold text-lg mb-4`}>Contact</h3>
            <p className="mb-2">Email: <a href="mailto:techdastak2@gmail.com" className="text-[#25d366] hover:underline transition-colors duration-200">techdastak2@gmail.com</a></p>
            <p>Developed with ❤️ by Haroon | Tech Dastak</p>
          </div>
        </div>

        <div className={`${theme === "dark" ? "bg-[#3c3d3f] text-white" : "bg-amber-100 text-black"} mt-8 p-4 rounded-lg relative`}>
          <div className="absolute top-0 right-0 px-2 pt-1 cursor-pointer rounded-full transition duration-300"
            onClick={() => { setActiveComponent(null) }} >
            X
          </div>
          <div>
            {renderComponent()}
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Tech Dastak. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
