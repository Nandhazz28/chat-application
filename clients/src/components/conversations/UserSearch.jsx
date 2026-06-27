import { useState, useCallback } from "react";
import { Search, Loader2, MessageCirclePlus, Users } from "lucide-react";
import { searchUsers }          from "../../services/user.services";
import { createConversation }   from "../../services/conversation.services";
import { useAuthContext }       from "../../shared/context/AuthContext";

const UserSearch = ({ onConversationCreated }) => {
  const { user: me }                  = useAuthContext();
  const [query, setQuery]             = useState("");
  const [results, setResults]         = useState([]);
  const [searching, setSearching]     = useState(false);
  const [startingId, setStartingId]   = useState(null);

  const handleSearch = useCallback(async () => {
  if (!query.trim()) return;
  try {
    setSearching(true);

    const users = await searchUsers(query.trim());

    console.log("USERS:", users);

    setResults(users || []);
  } catch (err) {
    console.error(err);
    setResults([]);
  } finally {
    setSearching(false);
  }
}, [query]);
  const handleStart = async (userId) => {
    try {
      setStartingId(userId);
      const res  = await createConversation(userId);
      const conv = res?.data || res;
      const other = conv?.participants?.find(p => String(p._id) !== String(me?._id));
      onConversationCreated({ ...conv, participant: other || conv?.participants?.[0] });
    } catch(e) { console.error(e); }
    finally { setStartingId(null); }
  };

  return (
    <div className="p-3 space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder="Search by username or email…"
            className="w-full pl-9 pr-3 py-2.5 bg-white/[0.03] border border-white/[0.07] rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/40 transition-all"
          />
        </div>
        <button onClick={handleSearch} disabled={searching || !query.trim()}
          className="px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-1.5">
          {searching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
          Search
        </button>
      </div>

      <div className="space-y-1.5 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
        {!searching && results.length === 0 && query && (
          <div className="py-8 flex flex-col items-center text-slate-500">
            <Users className="w-5 h-5 mb-2 stroke-[1.5]" />
            <span className="text-[11px] font-mono uppercase tracking-wider">No users found</span>
          </div>
        )}
        {results.map(u => (
          <div key={u._id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-sm font-bold border border-white/10">
                  {u.username?.charAt(0).toUpperCase()}
                </div>
                {u.isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#040217]" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">{u.username}</p>
                <p className="text-[10px] text-slate-500 font-mono">{u.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleStart(u._id)}
              disabled={!!startingId}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600 text-white text-[11px] font-semibold transition-all disabled:opacity-50">
              {startingId === u._id ? <Loader2 className="w-3 h-3 animate-spin" /> : <MessageCirclePlus className="w-3 h-3" />}
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;