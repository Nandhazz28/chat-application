import React from "react";
import { MessageSquare, Loader2, Circle } from "lucide-react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({
  messages = [],
  onSend,
  typingUser,
  currentUserId,
  loading,
}) => {
  return (
    <div className="relative flex flex-col h-full bg-[#030014] text-slate-200 overflow-hidden border border-white/10 rounded-2xl shadow-2xl shadow-purple-950/20 font-sans antialiased">
      
      {/* Background Cosmic Atmosphere */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[80px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-pink-600/10 blur-[80px] pointer-events-none transform-gpu" />

      {/* HEADER */}
      <div className="relative z-10 px-6 py-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <MessageSquare className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h2 className="font-semibold text-sm tracking-wide text-white">Comms Channel</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Subspace Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* MESSAGES LAYER */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        
        {/* Visual Upgrade for Loading State */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-4 text-xs font-mono tracking-wider text-purple-400 bg-purple-500/5 border border-purple-500/10 rounded-xl max-w-xs mx-auto backdrop-blur-sm">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-pink-500" />
            <span>DECRYPTING LOGS...</span>
          </div>
        )}

        {/* Empty State Illustration Filter (Optional but clean) */}
        {!loading && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40 py-12">
            <MessageSquare className="w-8 h-8 text-slate-500 mb-2 stroke-[1.5]" />
            <p className="text-xs font-mono tracking-wide text-slate-400">NO CORRESPONDENCE FOUND</p>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwn={msg.senderId === currentUserId}
          />
        ))}

        {typingUser && (
          <div className="relative z-20 animate-fade-in">
            <TypingIndicator user={typingUser} />
          </div>
        )}
      </div>

      {/* INPUT ANCHOR */}
      <div className="relative z-10 p-4 bg-gradient-to-t from-[#030014] via-[#030014]/90 to-transparent border-t border-white/5">
        <MessageInput onSend={onSend} />
      </div>
    </div>
  );
};

export default ChatWindow;