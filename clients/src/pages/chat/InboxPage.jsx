import { useEffect } from "react";
import { WifiOff, MessageSquarePlus } from "lucide-react";
import { getConversations }      from "../../services/conversation.services";
import { useChatContext }        from "../../shared/context/ChatContext";
import { useAuthContext }        from "../../shared/context/AuthContext";
import ConversationList          from "../../components/conversations/ConversationList";
import { useState } from "react";

const InboxPage = () => {
  const { conversations, setConversations, activeConversation, setActiveConversation, onlineUsers } = useChatContext();
  const { user } = useAuthContext();
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);

  useEffect(() => {
    if (!user?._id) return;
    let alive = true;
    const load = async () => {
      try {
        setLoading(true); setError(false);
        const res = await getConversations();
        const raw = res?.data || [];
        const normalized = raw.map(c => {
          const other = c.participants?.find(p => String(p._id) !== String(user._id));
          return { ...c, participant: other || c.participants?.[0] };
        });
        if (alive) setConversations(normalized);
      } catch(e) { if(alive) setError(true); }
      finally { if(alive) setLoading(false); }
    };
    load();
    return () => { alive = false; };
  }, [user?._id]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-shrink-0 px-4 py-2 flex items-center justify-between border-b border-white/[0.04]">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">Messages</span>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">{conversations.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 space-y-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl animate-pulse">
                <div className="w-11 h-11 rounded-full bg-white/[0.04] flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/5 bg-white/[0.04] rounded-full" />
                  <div className="h-2 w-3/5 bg-white/[0.02] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-500 gap-2">
            <WifiOff className="w-5 h-5 text-rose-500/50" />
            <span className="text-[11px] font-mono text-rose-400">Connection failed</span>
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-600 gap-2 select-none">
            <MessageSquarePlus className="w-6 h-6 stroke-[1.5]" />
            <span className="text-[11px] font-mono uppercase tracking-widest">No conversations yet</span>
          </div>
        ) : (
          <div className="p-2">
            <ConversationList
              conversations={conversations}
              activeId={activeConversation?._id}
              onSelect={setActiveConversation}
              onlineUsers={onlineUsers}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;