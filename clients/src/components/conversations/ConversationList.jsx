import { useState } from "react";
import ConversationItem from "./ConversationItem";
import { Search } from "lucide-react";

const ConversationList = ({ conversations, activeId, onSelect, onlineUsers }) => {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter(c => {
    const name = c?.participant?.username || "";
    const last = c?.lastMessage?.content || "";
    return name.toLowerCase().includes(search.toLowerCase()) || last.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search conversations…"
            className="w-full pl-9 pr-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/30 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-white/5">
        {filtered.length === 0 ? (
          <p className="text-center text-xs text-slate-600 font-mono py-8">No conversations found</p>
        ) : (
          filtered.map(conv => (
            <ConversationItem
              key={conv._id}
              conversation={conv}
              active={activeId === conv._id}
              onClick={() => onSelect(conv)}
              onlineUsers={onlineUsers}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;