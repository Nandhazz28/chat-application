import { useState } from "react";
import { Plus, X, MessageSquareCode, Compass } from "lucide-react";
import InboxPage from "./InboxPage";
import ActiveChatPage from "./ActiveChatPage";
import UserSearch from "../../components/conversations/UserSearch";
import { useChatContext } from "../../shared/context/ChatContext";
import { useAuthContext } from "../../shared/context/AuthContext";

const ChatPage = () => {
  const { activeConversation, setActiveConversation, setConversations } = useChatContext();
  const { user } = useAuthContext();
  const [showSearch, setShowSearch] = useState(false);

  const handleConversationCreated = (conversation) => {
    // Normalize participant field
    const other = conversation?.participants?.find(
      (p) => String(p._id) !== String(user?._id)
    );
    const normalized = { ...conversation, participant: other || conversation?.participants?.[0] };

    setActiveConversation(normalized);
    // Add to conversations list if not already there
    setConversations((prev) => {
      const exists = prev.find((c) => c._id === normalized._id);
      if (exists) return prev;
      return [normalized, ...prev];
    });
    setShowSearch(false);
  };

  return (
    <div className="h-screen w-full bg-[#030014] text-slate-200 flex overflow-hidden font-sans selection:bg-pink-500/30">

      {/* SIDEBAR */}
      <div className="w-full md:w-80 lg:w-96 border-r border-white/10 bg-[#080425]/30 backdrop-blur-2xl flex flex-col h-full relative z-20 flex-shrink-0">

        {/* HEADER */}
        <div className="p-4 border-b border-white/10 bg-[#06031a]/40 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center">
              <MessageSquareCode className="w-4 h-4 text-pink-400" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-white">
              Core.Terminal
            </span>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Node Live</span>
          </div>
        </div>

        {/* NEW CHAT BUTTON */}
        <div className="p-4 bg-[#080425]/10 select-none">
          <button
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            aria-expanded={showSearch}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none
              ${showSearch
                ? "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_0_15px_rgba(219,39,119,0.15)] hover:shadow-[0_0_25px_rgba(219,39,119,0.3)] hover:-translate-y-0.5 active:translate-y-0"
              }`}
          >
            {showSearch ? (
              <><X className="w-3.5 h-3.5 stroke-[2.5]" /> Cancel Discovery</>
            ) : (
              <><Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Initiate New Transmission</>
            )}
          </button>
        </div>

        {/* SEARCH OR INBOX */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {showSearch ? (
            <div className="absolute inset-0 z-30 bg-[#040217] flex flex-col">
              <div className="p-3 border-b border-white/[0.06] bg-[#080425]/40 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-purple-400 font-semibold select-none">
                <Compass className="w-3.5 h-3.5 animate-spin [animation-duration:10s]" />
                <span>Search Network Directories</span>
              </div>
              <div className="flex-1 overflow-y-auto">
                <UserSearch onConversationCreated={handleConversationCreated} />
              </div>
            </div>
          ) : null}

          <div className="flex-1 overflow-y-auto">
            <InboxPage />
          </div>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 h-full bg-[#030014]/10 relative z-10">
        <ActiveChatPage conversation={activeConversation} />
      </div>
    </div>
  );
};

export default ChatPage;