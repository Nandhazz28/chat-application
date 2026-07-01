import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

const VoiceMessage = ({ audioUrl }) => {
  const audioRef      = useRef(null);
  const [playing, setPlaying]   = useState(false);
  const [speed, setSpeed]       = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnded    = () => { setPlaying(false); setProgress(0); };
    const onLoaded   = () => setDuration(a.duration || 0);
    const onTimeUpdate = () => setProgress(a.currentTime / (a.duration || 1));
    a.addEventListener("ended",      onEnded);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      a.removeEventListener("ended",      onEnded);
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.5, 2];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-3 w-[200px]">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <button onClick={toggle}
        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
        {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
      </button>

      <div className="flex-1 relative h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer"
        onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct  = (e.clientX - rect.left) / rect.width;
          if (audioRef.current) audioRef.current.currentTime = pct * audioRef.current.duration;
        }}>
        <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all"
          style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[9px] font-mono text-white/50">{fmt(duration)}</span>
        <button onClick={cycleSpeed}
          className="text-[9px] font-bold text-purple-300 hover:text-purple-200 font-mono transition-colors">
          {speed}x
        </button>
      </div>
    </div>
  );
};

export default VoiceMessage;