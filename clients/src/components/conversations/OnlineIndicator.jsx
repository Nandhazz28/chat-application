import React from "react";

const OnlineIndicator = ({ online }) => {
  return (
    <span
      role="status"
      aria-label={online ? "Online" : "Offline"}
      className={`relative w-2.5 h-2.5 rounded-full inline-block transition-all duration-500 box-content border border-[#030014]
        ${
          online
            ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
            : "bg-slate-600/80 border border-white/5"
        }`}
    >
      {/* Subspace Signal Waves (Ping animation for active users) */}
      {online && (
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-45 [animation-duration:1.5s]" />
      )}
    </span>
  );
};

export default OnlineIndicator;