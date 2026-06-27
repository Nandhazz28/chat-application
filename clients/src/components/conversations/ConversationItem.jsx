import { formatTime } from "../../shared/utils/formatDate";

const ConversationItem = ({ conversation, active, onClick, onlineUsers = [] }) => {
  const participant = conversation?.participant || {};
  const isOnline    = onlineUsers.includes(String(participant._id));
  const name        = participant?.username || "Unknown";
  const lastMsg     = conversation?.lastMessage;
  const lastText    = lastMsg?.content || (lastMsg?.imageUrl ? "📷 Image" : lastMsg?.audioUrl ? "🎤 Voice" : lastMsg?.fileUrl ? "📎 File" : "No messages yet");
  const time        = lastMsg?.createdAt ? formatTime(lastMsg.createdAt) : "";
  const unread      = conversation?.unreadCount || 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-all duration-200 rounded-xl mb-0.5 outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50
        ${active ? "bg-gradient-to-r from-purple-500/10 to-pink-500/5 border border-purple-500/20" : "hover:bg-white/[0.025] border border-transparent"}`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white flex items-center justify-center font-bold text-sm border border-white/10 shadow-md">
          {name.charAt(0).toUpperCase()}
        </div>
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#030014] shadow-sm shadow-emerald-400/50" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-sm font-semibold truncate ${active ? "text-white" : "text-slate-200"}`}>{name}</span>
          <span className="text-[10px] text-slate-500 font-mono flex-shrink-0 ml-1">{time}</span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs text-slate-400 truncate flex-1">{lastText}</p>
          {unread > 0 && (
            <span className="flex-shrink-0 min-w-[18px] h-[18px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold flex items-center justify-center px-1">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;