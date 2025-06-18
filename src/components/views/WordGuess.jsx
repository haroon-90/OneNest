import React, { useState } from "react";
import Keyboard from "./Keyboard";
import GameBoard from "./GameBoard";
import { useTheme } from "../../context/ThemeContext"; // 🌙 Step 1: Import

const WORDS = [
  "PLANT", "APPLE", "GRAPE", "LEMON", "BERRY",
  "PEACH", "MANGO", "CHESS", "BRAVE", "CLOUD",
  "SHINE", "SUGAR", "WATER", "EARTH", "STONE",
  "SMILE", "HEART", "LIGHT", "NIGHT", "SWEET",
  "BREAD", "CHAIR", "TABLE", "SHEET", "SOUND",
  "MOUSE", "HOUSE", "TRAIN", "PLANE", "SHEET",
  "FRESH", "CLEAN", "SMART", "BRUSH", "CATCH",
  "FIGHT", "DREAM", "ERROR", "RUNNER", "JUMPY",
  "BRICK", "CRISP", "DRIVE", "FIELD", "GLASS",
  "HORSE", "JUICE", "KNIFE", "LAUGH", "MUSIC",
  "NURSE", "OCEAN", "PAINT", "QUIET", "ROAST",
  "SHEEP", "TEACH", "UNION", "VOICE", "WORLD"
];

const App = () => {
  const getRandomWord = () =>
    WORDS[Math.floor(Math.random() * WORDS.length)];

  const [solution, setSolution] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [status, setStatus] = useState("playing");

  const { theme } = useTheme(); // 🌙 Step 2: Access theme
  const isDark = theme === "dark";

  const handleKeyPress = (key) => {
    if (status !== "playing") return;

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      if (currentGuess.length === 5) {
        const newGuess = currentGuess.toUpperCase();
        const updatedGuesses = [...guesses, newGuess];
        setGuesses(updatedGuesses);
        setCurrentGuess("");

        if (newGuess === solution) {
          setStatus("won");
        } else if (updatedGuesses.length === 6) {
          setStatus("lost");
        }
      }
    } else {
      if (currentGuess.length < 5 && /^[A-Z]$/i.test(key)) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
      }
    }
  };

  const resetGame = () => {
    setSolution(getRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setStatus("playing");
  };

  return (
    <div
      className="min-h-[calc(100vh-136px)] flex flex-col items-center justify-center gap-4 p-4 rounded-lg transition-all duration-300"
      style={{
        backgroundColor: isDark ? "#1E1F24" : "#f4f4f4",
        color: isDark ? "#ffffff" : "#000000",
      }}
    >
      <h1 className="text-3xl font-bold" style={{ color: isDark ? "#81cfff" : "#2563eb" }}>
        Word Guessing Game
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
        <div>
          <div
            className="max-w-md p-4 rounded-lg shadow-lg"
            style={{
              backgroundColor: isDark ? "#2A2B31" : "#ffffff",
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            <GameBoard
              guesses={guesses}
              currentGuess={currentGuess}
              solution={solution}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {status === "lost" && (
            <p className="text-red-500 font-semibold">
              You lost! The correct word was:{" "}
              <span className="font-bold">{solution}</span>
            </p>
          )}

          {status === "won" && (
            <p className="text-green-500 font-semibold">
              🎉 You guessed it right!
            </p>
          )}

          {(status === "won" || status === "lost") && (
            <button
              onClick={resetGame}
              className="mt-2 px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
            >
              Play Again
            </button>
          )}

          <Keyboard onKeyPress={handleKeyPress} />
        </div>
      </div>
    </div>
  );
};

export default App;
