import React from "react";
import { Link } from "react-router-dom";
import { MoveLeft, HelpCircle, RadioTower } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#030014] flex flex-col items-center justify-center px-6 overflow-hidden select-none selection:bg-pink-500/30">
      
      {/* Immersive Deep-Space Backlight Diffusion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-600/10 to-pink-600/5 blur-[150px] pointer-events-none" />

      {/* Primary Telemetry Fault Header Indicator */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md animate-fade-in">
        
        {/* Dynamic Warning Hub Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] text-pink-400 mb-6 animate-pulse [animation-duration:3s]">
          <RadioTower className="w-6 h-6 stroke-[1.5]" />
        </div>

        {/* Big Error Code Vector with Layered Text Glow */}
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter bg-gradient-to-b from-white via-slate-200 to-slate-600 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.25)] select-none">
          404
        </h1>

        {/* Monospaced System Alert Classification Tag */}
        <h2 className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold mt-4 flex items-center gap-2 justify-center">
          <HelpCircle className="w-3.5 h-3.5" />
          Route Resolution Failure
        </h2>

        {/* Narrative Description Block */}
        <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-sm">
          The structural address you are attempting to access does not map to any active node in the console index directory.
        </p>

        {/* Interactive Return Navigation Mechanism */}
        <Link
          to="/chat"
          className="group relative inline-flex items-center justify-center gap-2 mt-8 px-6 py-3 rounded-xl text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_20px_rgba(219,39,119,0.2)] hover:shadow-[0_0_30px_rgba(219,39,119,0.4)] transition-all duration-300 outline-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
        >
          {/* Kinetic slide element attached to the vector arrow anchor */}
          <MoveLeft className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:-translate-x-1" />
          Return to Core Terminal
        </Link>
      </div>

      {/* Absolute Bottom Perimeter Metadata Tag */}
      <span className="absolute bottom-6 font-mono text-[9px] uppercase tracking-widest text-slate-600">
        System.Status // Broken_Link_Interrupt
      </span>
    </div>
  );
};

export default NotFoundPage;