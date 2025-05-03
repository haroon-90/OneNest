import React, { useState, useRef, useEffect } from "react";
import music_bg from "../../assets/Logo/music_bg.svg";
import { useTheme } from "../../context/ThemeContext";
import './views.css'

const MusicPlayer = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioPlayerRef = useRef(null);
  const [audioFileName, setAudioFileName] = useState("");
  const [isReady, setIsReady] = useState(false);
  const { theme } = useTheme();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFileName(file.name);
      const audio = new Audio(URL.createObjectURL(file));
      audioPlayerRef.current = audio;
      setAudioFile(file);
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
      audio.oncanplaythrough = () => {
        setIsReady(true);
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };
    }
  };

  const togglePlayPause = () => {
    if (!audioPlayerRef.current) return;

    if (isPlaying) {
      audioPlayerRef.current.pause();
    } else {
      audioPlayerRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime -= 10;
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
        audioPlayerRef.current.play(); // Replay the song
        setIsPlaying(true);
      });
    }
  }, [audioFile]);

  return (
    <div
      className={`${isPlaying ? "bg" : ""} ${theme === "dark" ? "text-white bg-black" : "text-black bg-white"} p-6 rounded-4xl shadow-xl w-[70vw] mx-auto mt-10 flex flex-col items-center`}
      style={{
        backgroundImage: `url(${music_bg})`,
        backgroundSize: "fit",
        backgroundPosition: "center",
      }}
    >
      <h2 className={`text-3xl ${theme === "dark" ? "bg-black" : "bg-white"} w-[fit-content] font-semibold text-center mb-6`}>Music Player</h2>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className={`block w-full text-sm ${theme === "dark" ? "text-white bg-black" : "text-black bg-white"} p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25d366]`}
      />
      {audioFile ? (
        <div className="bg-transparent p-6 rounded-lg shadow-xl max-w-lg mx-auto">
          <p className={`text-center text-lg font-medium ${theme === "dark" ? "text-white bg-black" : "text-black bg-white"} mb-4`}>Now Playing: {audioFileName}</p>
          <div className="flex items-center justify-center gap-6 mb-6">

            <button
              onClick={skipBackward}
              title="Backward 10s"
              className="bg-[#25d366] hover:bg-[#388e3c] text-black font-bold py-2 px-6 rounded-full shadow-md"
            >
              ⏴⏴
            </button>
            <button
              onClick={togglePlayPause}
              disabled={!isReady}
              className={`bg-[#25d366] hover:bg-[#2dfcb4] text-black font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300 ${!isReady ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isPlaying ? "||" : "⏵"}
            </button>
            <button
              onClick={skipForward}
              title="Forward 10s"
              className="bg-[#25d366] hover:bg-[#388e3c] text-black font-bold py-2 px-6 rounded-full shadow-md"
            >
              ⏵⏵
            </button>
          </div>
          <div className="w-full mb-6">
            <div className={`flex justify-between text-sm ${theme === "dark" ? "text-white bg-black" : "text-black bg-white"} mb-2`}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime || 0}
              onChange={handleProgressChange}
              className="w-full h-2 bg-[#333] rounded-lg"
            />
          </div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={toggleMute}
              className="bg-[#FF0000] hover:bg-[#D70000] text-black font-bold py-2 px-6 rounded-full shadow-md"
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-32 h-2 bg-[#333] rounded-lg"
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-white mt-6">Please select a music file to play.</p>
      )}
    </div>
  );
};

export default MusicPlayer;
