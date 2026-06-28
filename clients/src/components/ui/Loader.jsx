import React from "react";

const Loader = ({ size = "md", text = "Syncing network..." }) => {
  const sizeMap = {
    sm: { outer: "w-6 h-6 border", inner: "w-4 h-4 border", gap: "p-4", text: "text-[9px]" },
    md: { outer: "w-11 h-11 border-2", inner: "w-7 h-7 border-2", gap: "p-6", text: "text-[10px]" },
    lg: { outer: "w-16 h-16 border-[3px]", inner: "w-10 h-10 border-[3px]", gap: "p-10", text: "text-xs" }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center ${currentSize.gap} w-full select-none animate-fade-in`}
    >
      <div className="relative flex items-center justify-center">
        <div 
          className={`absolute rounded-full bg-gradient-to-tr from-pink-500/10 to-purple-500/10 blur-xl animate-pulse
            ${size === "lg" ? "w-20 h-20" : size === "sm" ? "w-8 h-8" : "w-14 h-14"}`} 
        />

        <div
          className={`${currentSize.outer} rounded-full border-purple-500/10 border-t-purple-500 animate-spin [animation-duration:1.2s]`}
        />

        <div
          className={`absolute ${currentSize.inner} rounded-full border-pink-500/10 border-b-pink-500 animate-spin [animation-direction:reverse] [animation-duration:0.8s]`}
        />
      </div>

      {text && (
        <span 
          className={`mt-3 font-mono uppercase tracking-widest text-slate-500 font-semibold animate-pulse [animation-duration:2s] ${currentSize.text}`}
        >
          {text}
        </span>
      )}
      
      <span className="sr-only">Loading dynamic interface modules</span>
    </div>
  );
};

export default Loader;