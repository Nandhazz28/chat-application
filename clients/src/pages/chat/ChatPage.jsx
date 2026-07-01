import { useEffect, useRef, useState } from "react";
import { Plus, X, MessageSquareCode, LogOut, User, Settings, Compass } from "lucide-react";
import InboxPage from "./InboxPage";
import ActiveChatPage from "./ActiveChatPage";
import UserSearch from "../../components/conversations/UserSearch";
import { useChatContext } from "../../shared/context/ChatContext";
import { useAuthContext } from "../../shared/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  connectSocket,
  disconnectSocket,
  onUserOnline,
  onUserOffline,
  removeListener,
} from "../../socket/socketManager";
import { SOCKET_EVENTS } from "../../socket/events";
import { logout as logoutService } from "../../services/auth.services";

const ChatPage = () => {
  const {
    activeConversation,
    setActiveConversation,
    setConversations,
    addOnlineUser,
    removeOnlineUser,
  } = useChatContext();
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const onOnlineRef = useRef(null);
  const onOfflineRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");
    connectSocket(token);

    onOnlineRef.current = onUserOnline((userId) => addOnlineUser(userId));
    onOfflineRef.current = onUserOffline((userId) => removeOnlineUser(userId));

    return () => {
      removeListener(SOCKET_EVENTS.USER_ONLINE, onOnlineRef.current);
      removeListener(SOCKET_EVENTS.USER_OFFLINE, onOfflineRef.current);
    };
  }, [user, addOnlineUser, removeOnlineUser]);

  const handleConversationCreated = (conv) => {
    setActiveConversation(conv);
    setConversations((prev) =>
      prev.some((c) => c._id === conv._id) ? prev : [conv, ...prev]
    );
    setShowSearch(false);
  };

  const handleLogout = async () => {
    disconnectSocket();
    await logoutService();
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-full bg-[#030014] text-slate-200 flex overflow-hidden">
      <aside className="w-[320px] flex-shrink-0 border-r border-white/[0.06] bg-[#06031a]/80 backdrop-blur-xl flex flex-col h-full z-20">
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/10 border border-purple-500/20 flex items-center justify-center">
              <MessageSquareCode className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-wide text-white">
                ChatApp
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono text-emerald-500">live</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate("/profile")}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              <User className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleLogout}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {user && (
          <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.04] bg-white/[0.01]">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold border border-white/10">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#06031a]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-tight">
                {user.username}
              </p>
              <p className="text-[10px] text-slate-500 font-mono">● You are online</p>
            </div>
          </div>
        )}

        <div className="flex-shrink-0 px-3 py-3">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
              showSearch
                ? "bg-white/[0.03] border border-white/[0.07] text-slate-300 hover:bg-white/[0.05]"
                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-950/30 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
            }`}
          >
            {showSearch ? (
              <>
                <X className="w-3.5 h-3.5" /> Cancel
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> New Conversation
              </>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-hidden relative">
          {showSearch && (
            <div className="absolute inset-0 z-30 bg-[#06031a] flex flex-col overflow-y-auto">
              <div className="flex-shrink-0 px-4 py-2 border-b border-white/[0.05] flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-purple-400 font-semibold">
                <Compass className="w-3 h-3" /> Find people
              </div>
              <UserSearch onConversationCreated={handleConversationCreated} />
            </div>
          )}
          <InboxPage />
        </div>
      </aside>

      <main className="flex-1 h-full overflow-hidden">
        <ActiveChatPage conversation={activeConversation} />
      </main>
    </div>
  );
};

export default ChatPage;