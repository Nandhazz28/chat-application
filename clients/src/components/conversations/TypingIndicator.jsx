import React from "react";

const TypingIndicator = ({ user }) => {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5 w-fit bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-md select-none animate-fade-in">
      
      {/* Cosmic Staggered Bouncing Wave Dots */}
      <div className="flex items-center gap-1 px-1.5 py-1 rounded-full bg-purple-500/5 border border-purple-500/10">
        <span 
          className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-duration:0.8s]" 
          style={{ animationDelay: "0ms" }}
        />
        <span 
          className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-duration:0.8s]" 
          style={{ animationDelay: "150ms" }}
        />
        <span 
          className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-duration:0.8s]" 
          style={{ animationDelay: "300ms" }}
        />
      </div>
      
      {/* System Font Identity String */}
      <span className="text-xs font-mono tracking-wide text-slate-400 pr-1">
        <span className="text-slate-200 font-semibold">{user?.name || "Agent"}</span> is typing...
      </span>
    </div>
  );
};

export default TypingIndicator;