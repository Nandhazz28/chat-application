import React from "react";
import { MessageSquare, ShieldCheck, Link2, MapPin, Sparkles } from "lucide-react";

const ProfileCard = ({ user }) => {
  if (!user) return null;

  const displayName = user?.username || user?.name || "Unknown";
  const stats = [
    { label: "Member Since", value: user?.createdAt ? new Date(user.createdAt).getFullYear() : "—" },
    { label: "Status", value: user?.isOnline ? "Online" : "Offline" },
    { label: "Bio", value: user?.bio ? "Yes" : "None" },
  ];

  return (
    <div className="relative w-full bg-[#080425]/80 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-purple-950/30 backdrop-blur-xl overflow-hidden group select-none transition-all duration-300 hover:border-purple-500/30">
      <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/0 blur-2xl pointer-events-none group-hover:from-pink-500/20 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-500/10 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-start justify-between mb-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-2xl font-bold text-white border border-white/10 shadow-lg shadow-purple-950/40 z-10 transition-transform duration-300 group-hover:scale-[1.03]">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span
            role="status"
            aria-label={user?.isOnline ? "Online" : "Offline"}
            className={`absolute -bottom-1.5 -right-1.5 z-20 w-3.5 h-3.5 rounded-full border-2 border-[#06031a]
              ${user?.isOnline ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" : "bg-slate-600"}`}
          >
            {user?.isOnline && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60 [animation-duration:1.5s]" />}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest text-slate-400">
          <ShieldCheck className="w-3 h-3 text-pink-400" />
          <span>Verified</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-1.5">
          {displayName}
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
        </h3>
        <div className="text-xs font-mono text-purple-400 mt-0.5">
          @{user?.username || "user"}
        </div>
        <div className="text-[11px] text-slate-400 font-mono mt-1">
          {user?.email}
        </div>
      </div>

      {user?.bio && (
        <p className="text-xs text-slate-300 leading-relaxed tracking-wide border-t border-white/[0.04] pt-3 mb-4">
          {user.bio}
        </p>
      )}

      <div className="grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-3 mb-5 text-center">
        {stats.map((stat, idx) => (
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
    </div>
  );
};

export default ProfileCard;