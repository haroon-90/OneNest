import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import './views.css';

const TicTacToe = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const winnerInfo = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winnerInfo) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  const renderCell = (index) => {
    const isWinningCell = winnerInfo?.line.includes(index);
    return (
      <motion.div
        onClick={() => handleClick(index)}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className={`w-20 h-20 md:w-24 md:h-24 text-2xl md:text-3xl flex items-center justify-center border border-gray-600 rounded-md cursor-pointer transition duration-300
          ${board[index] ? (isDark ? "bg-[#2A2B30]" : "bg-gray-200") : (isDark ? "bg-[#1E1F24] hover:bg-[#3a3b40]" : "bg-gray-100 hover:bg-gray-300")}
          ${isWinningCell ? "animate-glow border-[#25d366] text-[#25d366]" : ""}
        `}
      >
        {board[index]}
      </motion.div>
    );
  };

  return (
    <div
      className={`p-6 max-w-sm mx-auto rounded-xl shadow-lg`}
      style={{
        backgroundColor: isDark ? "#1A1B1F" : "#FFFFFF",
        color: isDark ? "#FFFFFF" : "#000000",
      }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">Tic Tac Toe</h2>

      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => renderCell(index))}
      </div>

      <div className="mt-4 text-center">
        {winnerInfo ? (
          <motion.p
            className="text-xl font-semibold mb-2 text-[#25d366]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {winnerInfo.winner} wins!
          </motion.p>
        ) : board.every(Boolean) ? (
          <p className="text-xl font-semibold mb-2">It's a draw!</p>
        ) : (
          <p className="text-lg mb-2">Turn: {isXTurn ? "X" : "O"}</p>
        )}

        <button
          onClick={resetGame}
          className="bg-[#25d366] hover:bg-[#2dfcb4] text-black font-bold py-2 px-6 rounded shadow-md transition-all duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
};

export default TicTacToe;
