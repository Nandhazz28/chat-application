import React from "react";
import { Radio, Loader2, Orbit } from "lucide-react";
import ConversationItem from "./ConversationItem";

const ConversationList = ({
  conversations = [],
  activeId,
  onSelect,
  loading,
}) => {
  return (
    <div className="h-full overflow-y-auto bg-[#030014] border-r border-white/5 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">

      {/* HEADER */}
      <div className="sticky top-0 z-20 p-4 border-b border-white/5 bg-[#030014]/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 shadow-[0_0_15px_rgba(219,39,119,0.15)]">
            <Radio className="w-4 h-4 text-pink-400 animate-pulse" />
          </div>
          <h2 className="font-bold text-base tracking-wide text-white">
            Channels
          </h2>
        </div>
        <div className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-slate-400 border border-white/5">
          {conversations.length} Active
        </div>
      </div>

      {/* LIST ARCHITECTURE */}
      <div className="divide-y divide-white/[0.02]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-slate-400 text-xs font-mono tracking-widest gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
            <span>SYNCING MATRIX...</span>
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-slate-500 text-xs font-mono tracking-wide gap-2 text-center opacity-60">
            <Orbit className="w-6 h-6 stroke-[1.5] text-slate-600 animate-spin [animation-duration:10s]" />
            <span>ORBIT IS EMPTY</span>
          </div>
        ) : (
          conversations.map((conv) => (
            <ConversationItem
              key={conv._id}
              conversation={conv}
              active={activeId === conv._id}
              onClick={() => onSelect(conv)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;