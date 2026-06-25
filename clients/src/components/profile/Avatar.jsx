import React from "react";

const Avatar = ({ name, size = "md" }) => {
  // Precise size mapping matrices optimized for high-end digital spacing blueprints
  const sizeClass =
    size === "sm"
      ? "w-8 h-8 text-xs tracking-wider border"
      : size === "lg"
      ? "w-14 h-14 text-lg tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.25)] border-2"
      : "w-11 h-11 text-sm tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.2)] border"; // Calibrated default to map seamlessly with conversation feeds

  // Fallback engine ensuring consistent display capitalization signatures
  const displayInitial = name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div
      role="img"
      aria-label={name ? `${name}'s profile avatar` : "Default user profile picture"}
      className={`${sizeClass} rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white flex items-center justify-center font-bold border-white/10 select-none uppercase transformation transition-transform duration-200 hover:scale-105`}
    >
      {displayInitial}
    </div>
  );
};

export default Avatar;