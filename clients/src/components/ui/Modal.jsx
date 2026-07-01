import React from "react";
import { X } from "lucide-react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#030014]/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#080425]/90 border border-white/10 p-6 rounded-2xl shadow-2xl shadow-purple-950/40 backdrop-blur-xl overflow-hidden transform transition-all duration-300 scale-100"
      >
        <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/0 blur-2xl pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-pink-400 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-200 focus:outline-none"
          aria-label="Close modal interface"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>

        <div className="relative z-10 text-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;