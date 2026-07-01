import React from "react";
import { X, MessagePlus } from "lucide-react";
import UserSearch from "./UserSearch";

const StartChatModal = ({
  open,
  onClose,
  onConversationCreated,
}) => {
  if (!open) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#030014]/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
    >
      <div className="relative w-full max-w-md bg-[#080425]/90 border border-white/10 p-6 rounded-2xl shadow-2xl shadow-purple-950/40 backdrop-blur-xl overflow-hidden transform transition-all duration-300 scale-100">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-b from-purple-500/15 to-pink-500/5 blur-[50px] pointer-events-none" />

        <div className="relative z-10 flex justify-between items-center mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <MessagePlus className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="font-bold text-base tracking-wide text-white">
              Initialize Frequency
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-pink-400 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-200 focus:outline-none"
            aria-label="Close modal interface"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        <div className="relative z-10">
          <UserSearch
            onConversationCreated={onConversationCreated}
          />
        </div>

      </div>
    </div>
  );
};

export default StartChatModal;