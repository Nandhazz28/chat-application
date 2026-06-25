import React from "react";
import { Check, CheckCheck } from "lucide-react";

const SeenIndicator = ({ seen }) => {
  return (
    <span
      role="status"
      aria-label={seen ? "Message read" : "Message delivered"}
      className={`flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest select-none font-semibold transition-colors duration-300
        ${seen ? "text-pink-400 drop-shadow-[0_0_4px_rgba(244,63,94,0.3)]" : "text-slate-500"}`}
    >
      {seen ? (
        <>
          <CheckCheck className="w-3.5 h-3.5 stroke-[2.5] text-pink-400" />
          <span>Seen</span>
        </>
      ) : (
        <>
          <Check className="w-3.5 h-3.5 stroke-[2] text-slate-500" />
          <span>Sent</span>
        </>
      )}
    </span>
  );
};

export default SeenIndicator;