import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import TicTacToe from "./views/TicTacToe";
import CardClash from "./views/CardClash";
import StopWatch from "./views/StopWatch";
import RollDice from "./views/RollDice";
import FlipCoin from "./views/FlipCoin";
import Calculator from "./views/Calculator";
import ColorGuess from "./views/ColorGuess";
import MusicPlayer from "./views/MusicPlayer";
import MusicPlayer2 from "./views/MusicPlayer2";
import MusicPlayer3 from "./views/MusicPlayer3";
import SnapCraft from "./views/SnapCraft";
import WordGuess from "./views/WordGuess";
import TicTacToeLOGO from "../assets/Logo/Tic_Tac_Toe_logo.svg";
import CardClashLOGO from "../assets/Logo/Card_Clash_logo.svg";
import StopWatchLOGO from "../assets/Logo/StopWatch_logo.svg";
import RollDiceLOGO from "../assets/Logo/dice_logo.svg";
import FlipCoinLOGO from "../assets/Logo/coin_logo.svg";
import CalculatorLOGO from "../assets/Logo/calculator_logo.svg";
import MusicPlayerLOGO from "../assets/Logo/music_logo.svg";
import AiAdviceLOGO from "../assets/Logo/Ai_advice_logo.svg";
import LOGO from "../assets/Logo/OneNest_logo.svg";

const Main = () => {
  const [activeComponent, setActiveComponent] = useState("");
  const { theme } = useTheme();

  const renderComponent = () => {
    switch (activeComponent) {
      case "tictactoe":
        return <TicTacToe />;
      case "cardclash":
        return <CardClash />;
      case "stopwatch":
        return <StopWatch />;
      case "rolldice":
        return <RollDice />;
      case "flipcoin":
        return <FlipCoin />;
      case "colorguess":
        return <ColorGuess />;
      case "musicplayer":
        return <MusicPlayer3  />;
      case "wordguess":
        return <WordGuess />;
      default:
        return (<img src={LOGO} alt="OneNest Logo" className="h-[40vh] w-auto"></img>);
    }
  };

  const buttons = [
    { label: "Tic Tac Toe", value: "tictactoe", logo: TicTacToeLOGO },
    { label: "Card Clash", value: "cardclash", logo: CardClashLOGO },
    { label: "Stop Watch", value: "stopwatch", logo: StopWatchLOGO },
    { label: "Roll Dice", value: "rolldice", logo: RollDiceLOGO },
    { label: "Flip Coin", value: "flipcoin", logo: FlipCoinLOGO },
    { label: "ColorGuess", value: "colorguess", logo: CalculatorLOGO },
    { label: "Music Player", value: "musicplayer", logo: MusicPlayerLOGO },
    { label: "WordGuess", value: "wordguess", logo: AiAdviceLOGO },
  ];

  return (
    <div className={`${theme === "dark" ? "bg-[#313234] text-white" : "bg-amber-100 text-black"}  min-h-[60vh] p-6 text-white flex flex-col items-center pb-20`}>
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {buttons.map((btn) => (
          <div
            key={btn.value}
            onClick={() => setActiveComponent(btn.value)}
            className={`p-4 min-w-[10vw] rounded font-medium transition flex flex-col items-center gap-2 ${activeComponent === btn.value
                ? "bg-[#25d366] text-black hover:bg-[#96fcda]"
                : theme === "dark" ? "bg-[#1E1F24] text-white hover:bg-[#3c3c44]" : "bg-white text-black hover:bg-[#caf9e9]"
              }`}
          >
            <img src={btn.logo} alt={btn.label} className={`h-20 w-20 ${theme === "dark" ? "" : "invert"}`} />
            {btn.label}
          </div>
        ))}
      </div>

      <div className="mt-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Main;
