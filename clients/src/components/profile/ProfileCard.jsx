import React from "react";
import { MessageSquare, ShieldCheck, Link2, MapPin, Sparkles } from "lucide-react";

// Mock data provided for standalone execution out of the box
const DEFAULT_USER = {
  name: "Rakesh V",
  role: "Core Architecture Engineer",
  location: "Grid Sector 04 / Chennai",
  bio: "Crafting full-stack pixel architectures, interactive cosmic systems, and low-latency digital pipelines using React, Node, and Tailwind.",
  isOnline: true,
  stats: [
    { label: "Transmissions", value: "2.4k" },
    { label: "Deployments", value: "142" },
    { label: "Uptime", value: "99.9%" },
  ],
  website: "https://porsche-heritage.digital"
};

const ProfileCard = ({ user = DEFAULT_USER }) => {
  return (
    <div className="relative w-full max-w-sm bg-[#080425]/80 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-purple-950/30 backdrop-blur-xl overflow-hidden group select-none transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
      
      {/* Dynamic Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/0 blur-2xl pointer-events-none group-hover:from-pink-500/20 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-500/10 to-transparent blur-2xl pointer-events-none" />

      {/* CARD ACCENT LINE */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

      {/* HEADER SECTION: AVATAR & ONLINE METRIC */}
      <div className="relative flex items-start justify-between mb-5">
        <div className="relative">
          {/* Main Character Avatar Token */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-2xl font-bold text-white border border-white/10 shadow-lg shadow-purple-950/40 relative z-10 transition-transform duration-300 group-hover:scale-[1.03]">
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          {/* Active Status Beacon */}
          <span 
            role="status"
            aria-label={user.isOnline ? "Active Network Frequency" : "Offline Link"}
            className={`absolute -bottom-1.5 -right-1.5 z-20 w-3.5 h-3.5 rounded-full border-2 border-[#06031a] box-content
              ${user.isOnline ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" : "bg-slate-600"}`}
          >
            {user.isOnline && (
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60 [animation-duration:1.5s]" />
            )}
          </span>
        </div>

        {/* Verification Status Badge */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest text-slate-400">
          <ShieldCheck className="w-3 h-3 text-pink-400" />
          <span>Verified</span>
        </div>
      </div>

      {/* IDENTITY METADATA BLOCK */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-1.5">
          {user.name}
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
        </h3>
        
        <div className="text-xs font-mono text-purple-400 mt-0.5">
          {user.role}
        </div>
        
        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono mt-2">
          <MapPin className="w-3 h-3 text-slate-500" />
          <span>{user.location}</span>
        </div>
      </div>

      {/* BIO DESCRIPTIVE CORE */}
      <p className="text-xs text-slate-300 leading-relaxed tracking-wide border-t border-white/[0.04] pt-3 mb-4">
        {user.bio}
      </p>

      {/* ANALYTICS DATA GRID */}
      <div className="grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-3 mb-5 text-center">
        {user.stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-xs font-bold text-white font-mono tracking-tight">
              {stat.value}
            </span>
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 mt-0.5">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* CORE ACTION LAYERS */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold tracking-wide shadow-md shadow-pink-950/20 hover:shadow-pink-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none"
        >
          <MessageSquare className="w-3.5 h-3.5 stroke-[2]" />
          Open Channel
        </button>

        <a
          href={user.website}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none"
          aria-label="View digital terminal link"
        >
          <Link2 className="w-4 h-4 stroke-[2]" />
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;