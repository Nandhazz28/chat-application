import { useState } from "react";
import { Search, MessageCirclePlus, Loader2, Users } from "lucide-react";
import { searchUsers } from "../../services/user.services";
import { createConversation } from "../../services/conversation.services";

const UserSearch = ({ onConversationCreated }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [starting, setStarting] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      setSearching(true);
      const result = await searchUsers(query);
      setUsers(result || []);
    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setSearching(false);
    }
  };

  const handleStartChat = async (userId) => {
    try {
      setStarting(userId);
      const conversation = await createConversation(userId);
      if (!conversation?._id) return;
      onConversationCreated(conversation);
    } catch (err) {
      console.error("Create conversation error:", err);
    } finally {
      setStarting(null);
    }
  };

  return (
    <div className="p-3 space-y-3">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by username..."
            className="w-full pl-9 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/40 transition-all"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={searching}
          className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-1.5"
        >
          {searching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
          Search
        </button>
      </div>

      {/* Results */}
      <div className="space-y-1.5 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
        {users.length === 0 && !searching && query && (
          <div className="flex flex-col items-center py-6 text-slate-500 select-none">
            <Users className="w-5 h-5 mb-1.5 stroke-[1.5]" />
            <span className="text-[10px] font-mono uppercase tracking-widest">No users found</span>
          </div>
        )}

        {users.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold border border-white/10">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">{user.username}</p>
                <p className="text-[10px] text-slate-500 font-mono">{user.email}</p>
              </div>
            </div>

            <button
              onClick={() => handleStartChat(user._id)}
              disabled={!!starting}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600 text-white text-[11px] font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              {starting === user._id ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <MessageCirclePlus className="w-3 h-3" />
              )}
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;