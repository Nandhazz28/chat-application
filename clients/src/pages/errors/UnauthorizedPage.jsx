import React from "react";
import { Link } from "react-router-dom";
import { MoveRight, ShieldAlert, LockKeyhole } from "lucide-react";

const UnauthorizedPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#030014] flex flex-col items-center justify-center px-6 overflow-hidden select-none selection:bg-pink-500/30">
      
      {/* Deep-Space Core Backlight Glow Field */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rose-600/10 to-purple-600/5 blur-[150px] pointer-events-none" />

      {/* Primary Telemetry Security Exception Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md animate-fade-in">
        
        {/* Dynamic System Alert Badge */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/10 shadow-[0_0_30px_rgba(244,63,94,0.15)] text-rose-400 mb-6 animate-pulse [animation-duration:3s]">
          <LockKeyhole className="w-5 h-5 stroke-[1.5]" />
        </div>

        {/* Big Security Fault Code Vector with Crimson Text Glow */}
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter bg-gradient-to-b from-white via-slate-200 to-slate-600 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(244,63,94,0.2)] select-none">
          401
        </h1>

        {/* Monospaced System Access Classification Tag */}
        <h2 className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold mt-4 flex items-center gap-2 justify-center">
          <ShieldAlert className="w-3.5 h-3.5" />
          Authentication Token Missing
        </h2>

        {/* System Error Logs Description Narrative */}
        <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xs">
          Your current session signature is unverified. You must provide valid identity credentials to mount this console interface.
        </p>

        {/* Interactive Gateway Navigation Button */}
        <Link
          to="/login"
          className="group relative inline-flex items-center justify-center gap-2 mt-8 px-6 py-3 rounded-xl text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-rose-600 to-purple-600 shadow-[0_0_20px_rgba(244,63,94,0.15)] hover:shadow-[0_0_30px_rgba(244,63,94,0.35)] transition-all duration-300 outline-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
        >
          Proceed to Login Gateway
          <MoveRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Absolute Perimeter Architecture Identifier */}
      <span className="absolute bottom-6 font-mono text-[9px] uppercase tracking-widest text-slate-600">
        Security.Level // Handshake_Required
      </span>
    </div>
  );
};

export default UnauthorizedPage;