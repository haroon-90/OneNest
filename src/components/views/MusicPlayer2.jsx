import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import music_bg from "../../assets/Logo/music_bg.svg";
import './views.css';

const MusicPlayer = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioFileName, setAudioFileName] = useState("");
    const audioPlayerRef = useRef(new Audio());
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${isPlaying ? "bg" : ""} ${theme === "dark" ? "bg-zinc-900" : "bg-slate-50"} 
                p-10 rounded-3xl shadow-lg max-w-2xl mx-auto mt-12 backdrop-blur-sm`}
            style={{
                backgroundImage: `url(${music_bg})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
            }}
        >
            <div className="space-y-8">
                {/* File Upload Area */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative group"
                >
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`${theme === "dark" ? "bg-zinc-800/50" : "bg-white/50"}
                        border border-indigo-400 rounded-2xl p-6 text-center backdrop-blur-sm`}>
                        <p className="text-indigo-400 font-medium">Drop audio file or click to select</p>
                    </div>
                </motion.div>

                {/* Player Controls */}
                {audioFile && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-indigo-400 truncate text-center">
                            {audioFileName}
                        </h3>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="h-1.5 bg-gray-700/30 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center space-x-8">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={skipBackward}
                                className="p-2 rounded-full hover:bg-indigo-100/10"
                            >
                                <FaBackward className="text-indigo-400 text-lg" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={togglePlayPause}
                                className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white shadow-lg"
                            >
                                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={skipForward}
                                className="p-2 rounded-full hover:bg-indigo-100/10"
                            >
                                <FaForward className="text-indigo-400 text-lg" />
                            </motion.button>
                        </div>

                        {/* Volume Control */}
                        <div className="flex items-center space-x-3 px-4">
                            <button onClick={toggleMute} className="hover:opacity-80">
                                {isMuted ? <FaVolumeMute className="text-red-400" /> : <FaVolumeUp className="text-indigo-400" />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-full h-1 bg-gray-700/30 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MusicPlayer;
