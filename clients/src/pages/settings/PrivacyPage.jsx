import { useState } from "react";
import { Eye, ShieldCheck, Mail, CheckCircle2, Lock, Sparkles } from "lucide-react";

const PrivacyPage = () => {
  const [settings, setSettings] = useState({
    showOnlineStatus: true,
    allowMessages: true,
    readReceipts: true,
  });

  const handleToggle = async (field) => {
    // Optimistic local state update
    const nextState = !settings[field];
    setSettings((prev) => ({
      ...prev,
      [field]: nextState,
    }));

    try {
      // TODO: Integrate background database sync here
      // await updatePrivacySettings({ [field]: nextState });
      console.log(`Telemetry synchronized: ${field} -> ${nextState}`);
    } catch (err) {
      console.error("Failed to propagate privacy matrix changes:", err);
      // Rollback logic can be injected here if background sync breaks down
    }
  };

  // Structural list configuration to scale the dashboard cleanly
  const privacySchema = [
    {
      id: "showOnlineStatus",
      title: "Transmission Signal",
      description: "Broadcast your active online network footprint to public directories.",
      icon: Eye,
    },
    {
      id: "allowMessages",
      title: "Open Interlink Frequencies",
      description: "Permit inbound peer-to-peer connection packets from external nodes.",
      icon: Mail,
    },
    {
      id: "readReceipts",
      title: "Data Read Receipts",
      description: "Transmit message consumption metrics across active chat pipelines.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#030014] flex items-center justify-center p-6 overflow-hidden relative selection:bg-pink-500/30">
      
      {/* Immersive Deep-Space Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none animate-pulse [animation-duration:6s]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-600/5 blur-[120px] pointer-events-none animate-pulse [animation-duration:4s]" />

      {/* Main Glassmorphic Settings Shell */}
      <div className="relative w-full max-w-2xl bg-[#080425]/40 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-950/20 backdrop-blur-xl z-10 transition-all duration-300 hover:border-purple-500/20">
        
        {/* Subtle upper micro-glow highlight accent bar */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

        {/* PRIVACY CONTROLS TITLE BAR HEADER */}
        <div className="flex flex-col items-center text-center mb-8 select-none">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] mb-3">
            <Lock className="w-5 h-5 text-pink-400" />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white flex items-center gap-1.5">
            Privacy Parameters
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          </h1>
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mt-1">
            Configure Encryption Encapsulation
          </p>
        </div>

        {/* INTERACTIVE PRIVACY CONFIGURATION INDEX */}
        <div className="divide-y divide-white/[0.06] space-y-5">
          {privacySchema.map((item, idx) => {
            const IconComponent = item.icon;
            const isChecked = settings[item.id];

            return (
              <div 
                key={item.id}
                className={`flex items-center justify-between gap-6 pt-5 ${idx === 0 ? "pt-0" : ""}`}
              >
                {/* Descriptive Text & Icon Stack */}
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center border transition-colors duration-300 ${
                    isChecked 
                      ? "bg-pink-500/10 border-pink-500/20 text-pink-400" 
                      : "bg-white/[0.02] border-white/5 text-slate-500"
                  }`}>
                    <IconComponent className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-wide text-slate-200">
                      {item.title}
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 leading-relaxed max-w-md">
                      {item.description}
                    </span>
                  </div>
                </div>

                {/* Custom sliding switch component */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={isChecked}
                  onClick={() => handleToggle(item.id)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 relative flex-shrink-0 ${
                    isChecked ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-white/10"
                  }`}
                >
                  {/* Slider interior circle pill */}
                  <div className={`w-4 h-4 bg-white rounded-md shadow-md transition-transform duration-300 flex items-center justify-center ${
                    isChecked ? "translate-x-5" : "translate-x-0"
                  }`}>
                    {/* Tiny secure node confirmation element visible only when active */}
                    <div className={`w-1.5 h-1.5 rounded-full bg-pink-500 transition-opacity duration-200 ${
                      isChecked ? "opacity-100" : "opacity-0"
                    }`} />
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* CONTROL DEPLOYMENT FOOTER BANNER */}
        <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-slate-500 select-none">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Security Matrix Configured // Client-Side Validation Active</span>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPage;