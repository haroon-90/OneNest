import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import './App.css'
import { useTheme } from "./context/ThemeContext";


function App() {
  const { theme } = useTheme();

  return (
    <>
      <div className={`${theme === "dark" ? "bg-[#313234] text-white" : "bg-amber-50 text-black"} min-h-screen`}>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  )
}

export default App
