import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

const StopWatch = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (timeInMilliseconds) => {
    const hours = Math.floor(timeInMilliseconds / 3600000);
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = timeInMilliseconds % 1000;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(3, "0")}`;
  };

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div
      className="p-6 rounded-lg w-80 mx-auto"
      style={{
        backgroundColor: isDark ? "#1A1B1F" : "#f9f9f9",
        color: isDark ? "#ffffff" : "#000000",
      }}
    >
      <h2 className="text-center text-2xl font-bold mb-4">⏱ Stop Watch</h2>

      <div className="mb-6 text-center text-3xl font-semibold">
        {formatTime(time)}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleStartStop}
          className="bg-[#25d366] hover:bg-[#00e19e] text-black font-semibold py-3 px-6 rounded-lg transition"
        >
          {isRunning ? "Stop" : "Start"}
        </button>

        <button
          onClick={handleReset}
          className="bg-[#FF6347] hover:bg-[#FF4C36] text-black font-semibold py-3 px-6 rounded-lg transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
