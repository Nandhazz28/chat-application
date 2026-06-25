import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Headphones, Loader2 } from "lucide-react";

const VoiceMessage = ({ audioUrl }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Synchronize playback states when switching chat target contexts
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setIsLoaded(false);
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback interrupted:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoaded(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleScrub = (e) => {
    const targetTime = parseFloat(e.target.value);
    if (audioRef.current && !isNaN(targetTime)) {
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  // Safe duration calculator formatting strings into M:SS blocks
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Calculate percentage progress for dynamic track fill styling
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-xl p-3 min-w-[240px] max-w-xs backdrop-blur-md shadow-lg shadow-black/20 select-none">
      {/* Hidden baseline HTML5 engine block */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        preload="metadata"
      />

      {/* Play / Pause Control Button */}
      <button
        type="button"
        onClick={togglePlay}
        className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md shadow-purple-950/30 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none flex-shrink-0"
        aria-label={isPlaying ? "Pause voice note" : "Play voice note"}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-white text-white stroke-[2.5]" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-white text-white translate-x-[0.5px] stroke-[2.5]" />
        )}
      </button>

      {/* Scrubbing Audio Timeline Track */}
      <div className="flex-1 min-w-0">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleScrub}
          className="w-full accent-pink-500 h-1 rounded-lg appearance-none cursor-pointer focus:outline-none transition-all"
          style={{
            background: `linear-gradient(to right, #ec4899 0%, #a855f7 ${progressPercent}%, rgba(255,255,255,0.08) ${progressPercent}%, rgba(255,255,255,0.08) 100%)`,
          }}
        />
        
        {/* Timestamp Meta Layers */}
        <div className="flex justify-between items-center mt-1 text-[9px] font-mono tracking-wider text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <span className="flex items-center gap-1">
            {!isLoaded && <Loader2 className="w-2 h-2 animate-spin text-purple-400" />}
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Media Type Decorative Node */}
      <div className="flex-shrink-0 text-slate-500 bg-white/5 p-1.5 rounded-md border border-white/5">
        <Headphones className="w-3.5 h-3.5 stroke-[1.5]" />
      </div>
    </div>
  );
};

export default VoiceMessage;