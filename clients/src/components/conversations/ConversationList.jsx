import React from "react";
import OnlineIndicator from "./OnlineIndicator";
import UnreadBadge from "./UnreadBadge";

const ConversationItem = ({ conversation, active, onClick, onlineUsers = [] }) => {
  const user = conversation?.participant || {};
  const isOnline = onlineUsers.includes(user._id);
  const displayName = user?.username || user?.name || "Unknown User";
  const lastMsg = conversation?.lastMessage?.content || "No messages yet";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`flex items-center gap-3.5 p-4 border-b border-white/5 cursor-pointer transition-all duration-200 outline-none select-none
        ${active
          ? "bg-gradient-to-r from-purple-500/15 via-pink-500/5 to-transparent relative after:absolute after:left-0 after:top-2 after:bottom-2 after:w-1 after:bg-gradient-to-b after:from-purple-500 after:to-pink-500 after:rounded-r-md"
          : "hover:bg-white/[0.02]"
        }
        focus-visible:bg-white/[0.04]
      `}
    >
      <div className="relative flex-shrink-0">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.25)] border border-white/10">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-[#030014]">
          <OnlineIndicator online={isOnline} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center gap-2 mb-1">
          <h3 className={`text-sm font-semibold truncate transition-colors duration-150 ${active ? "text-white" : "text-slate-200"}`}>
            {displayName}
          </h3>
          <div className="flex-shrink-0">
            <UnreadBadge count={conversation?.unreadCount} />
          </div>
        </div>
        <p className="text-xs text-slate-400 font-medium truncate tracking-wide">
          {lastMsg}
        </p>
      </div>
    </div>
  );
};

export default ConversationItem;