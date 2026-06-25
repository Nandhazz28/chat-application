import { Link } from "react-router-dom";
import { User, Lock, LogOut, ChevronRight, Sliders, Radio, Sparkles } from "lucide-react";

const SettingsPage = () => {
  const handleLogout = () => {
    // Purge session telemetry payload from local device vectors
    localStorage.removeItem("token");
    
    // Hard refresh forces clean context termination and tree demounting
    window.location.href = "/login";
  };

  // Automated layout model schema for navigation indexes
  const settingsNavigation = [
    {
      to: "/profile",
      title: "Identity Profile",
      description: "Manage system credential parameters and authentication names.",
      icon: User,
      accentClass: "group-hover:text-purple-400 group-hover:border-purple-500/30 bg-purple-500/5",
    },
    {
      to: "/privacy",
      title: "Privacy Matrix",
      description: "Configure network visibility footprint and encryption rules.",
      icon: Lock,
      accentClass: "group-hover:text-pink-400 group-hover:border-pink-500/30 bg-pink-500/5",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#030014] flex items-center justify-center p-6 overflow-hidden relative selection:bg-pink-500/30">
      
      {/* Deep-Space Ambient Diffusion Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-600/10 to-pink-600/5 blur-[150px] pointer-events-none animate-pulse [animation-duration:7s]" />

      {/* Main Settings Terminal Panel */}
      <div className="relative w-full max-w-2xl bg-[#080425]/40 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-950/20 backdrop-blur-xl z-10 transition-all duration-300 hover:border-purple-500/20">
        
        {/* Horizontal edge micro-accent line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

        {/* TERMINAL HEADER SECTION */}
        <div className="flex flex-col items-center text-center mb-8 select-none">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] mb-3">
            <Sliders className="w-5 h-5 text-pink-400" />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white flex items-center gap-1.5">
            System Control Index
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          </h1>
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mt-1">
            Global Environment Node Parameters
          </p>
        </div>

        {/* NAVIGATION LINK STACK LAYER */}
        <div className="space-y-4">
          {settingsNavigation.map((node) => {
            const IconComponent = node.icon;
            
            return (
              <Link
                key={node.to}
                to={node.to}
                className="group flex items-center justify-between p-4 bg-[#030014]/40 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-purple-950/30"
              >
                <div className="flex items-center gap-4">
                  {/* Dynamic Adaptive Micro-Icon Container */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 text-slate-400 transition-all duration-300 ${node.accentClass}`}>
                    <IconComponent className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-wide text-slate-200 transition-colors group-hover:text-white">
                      {node.title}
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 leading-relaxed max-w-sm sm:max-w-md">
                      {node.description}
                    </span>
                  </div>
                </div>
                
                {/* Visual kinetic direction arrow */}
                <ChevronRight className="w-4 h-4 text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-slate-300" />
              </Link>
            );
          })}

          {/* DESTRUCTIVE ACTION DISPATCH ELEMENT (LOGOUT) */}
          <button
            type="button"
            onClick={handleLogout}
            className="group w-full flex items-center justify-between p-4 bg-rose-500/[0.01] hover:bg-rose-500/[0.03] border border-rose-500/10 hover:border-rose-500/20 rounded-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-1 focus:ring-rose-500/30"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose-500/5 border border-rose-500/10 group-hover:border-rose-500/20 flex items-center justify-center text-rose-400 transition-colors duration-300">
                <LogOut className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold tracking-wide text-rose-400">
                  Terminate Active Session
                </span>
                <span className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Purge security handshake tokens and detach console routing logs.
                </span>
              </div>
            </div>
            
            <ChevronRight className="w-4 h-4 text-rose-500/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-rose-400/60" />
          </button>
        </div>

        {/* METADATA SYSTEM CONTROL FOOTER FOOTPRINT */}
        <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-slate-600 select-none">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>Connection Secure</span>
          </div>
          <span>v2.4.0-Alpha</span>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;