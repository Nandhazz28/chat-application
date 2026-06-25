import { useEffect, useState } from "react";
import { Radio, WifiOff, Box } from "lucide-react";
import { getConversations } from "../../services/conversation.services";
import { useChatContext } from "../../shared/context/ChatContext";
import { useAuthContext } from "../../shared/context/AuthContext";
import ConversationList from "../../components/conversations/ConversationList";

const InboxPage = () => {
  const { conversations, setConversations, activeConversation, setActiveConversation } = useChatContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setNetworkError(false);

        const response = await getConversations();
        const raw = response?.data || [];

        // Normalize: add .participant = the OTHER user (not current user)
        const normalized = raw.map((conv) => {
          const other = conv.participants?.find(
            (p) => String(p._id) !== String(user?._id)
          );
          return { ...conv, participant: other || conv.participants?.[0] };
        });

        if (isMounted) setConversations(normalized);
      } catch (error) {
        console.error("Inbox fetch error:", error);
        if (isMounted) {
          setNetworkError(true);
          setConversations([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [user?._id]);

  return (
    <div className="h-full flex flex-col bg-transparent">
      <div className="px-4 py-2 bg-white/[0.01] border-b border-white/[0.04] flex items-center justify-between select-none">
        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
          Active Frequencies
        </span>
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
          {conversations.length} Nodes
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
        {loading ? (
          <div className="p-4 space-y-3 select-none">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/5 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-white/5" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/2 bg-white/10 rounded" />
                  <div className="h-2 w-3/4 bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : networkError ? (
          <div className="p-8 text-center flex flex-col items-center justify-center select-none">
            <WifiOff className="w-5 h-5 text-rose-500/60 mb-2" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-medium">
              Link Handshake Failed
            </span>
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center justify-center select-none opacity-40 h-64">
            <Box className="w-6 h-6 text-slate-500 mb-2 stroke-[1.5]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
              No Active Channels
            </span>
          </div>
        ) : (
          <div className="p-2">
            <ConversationList
              conversations={conversations}
              activeId={activeConversation?._id}
              onSelect={setActiveConversation}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;