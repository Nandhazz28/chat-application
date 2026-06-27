import { useEffect, useRef, useCallback } from "react";
import { Phone, Video, Info, MoreVertical } from "lucide-react";
import { getMessages, markSeen } from "../../services/message.services";
import { useChatContext }        from "../../shared/context/ChatContext";
import { useAuthContext }        from "../../shared/context/AuthContext";
import MessageBubble             from "../../components/conversations/MessageBubble";
import MessageInput              from "../../components/conversations/MessageInput";
import TypingIndicator           from "../../components/conversations/TypingIndicator";
import { formatLastSeen }        from "../../shared/utils/formatDate";
import {
  joinConversation, leaveConversation,
  onReceiveMessage, onMessageEdited, onMessageDeleted, onMessageReaction, onMessagesSeen,
  onTypingStart, onTypingStop,
  removeListener, emitSeen,
} from "../../socket/socketManager";
import { SOCKET_EVENTS } from "../../socket/events";

const DateSeparator = ({ label }) => (
  <div className="flex items-center gap-3 my-4 px-4 select-none">
    <div className="flex-1 h-px bg-white/[0.05]" />
    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.02] border border-white/[0.05]">
      {label}
    </span>
    <div className="flex-1 h-px bg-white/[0.05]" />
  </div>
);

const ActiveChatPage = ({ conversation }) => {
  const { messages, setMessages, addMessage, updateMessage, removeMessage, typing, setTyping, onlineUsers } = useChatContext();
  const { user } = useAuthContext();
  const bottomRef = useRef(null);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (!conversation?._id) return;
    let alive = true;
    setMessages([]);
    setTyping(null);
    joinConversation(conversation._id);

    const load = async () => {
      try {
        const res = await getMessages(conversation._id);
        if (alive) setMessages(res?.data || []);
        // Mark as seen
        await markSeen(conversation._id);
        emitSeen({ conversationId: conversation._id, userId: user?._id });
      } catch(e) { console.error(e); if(alive) setMessages([]); }
    };
    load();
    return () => { alive = false; leaveConversation(conversation._id); };
  }, [conversation?._id]);

  // Socket listeners
  useEffect(() => {
    if (!conversation?._id) return;

    const handleMsg     = (msg) => { if(msg.conversationId === conversation._id) addMessage(msg); };
    const handleEdited  = (msg) => updateMessage(msg);
    const handleDeleted = ({ messageId, deleteFor }) => {
      if (deleteFor === "everyone") removeMessage(messageId);
      else updateMessage({ _id: messageId, deletedForEveryone: deleteFor === "everyone" });
    };
    const handleReaction = ({ messageId }) => {
      // Re-fetch that message or update locally — here we just refetch all for simplicity
    };
    const handleSeen = ({ conversationId: cId }) => {
      if (cId === conversation._id) {
        setMessages(prev => prev.map(m => ({ ...m, status: "seen" })));
      }
    };
    const handleTypingStart = ({ userId, username }) => {
      if (userId !== user?._id) setTyping({ userId, username });
    };
    const handleTypingStop  = ({ userId }) => {
      setTyping(prev => prev?.userId === userId ? null : prev);
    };

    onReceiveMessage(handleMsg);
    onMessageEdited(handleEdited);
    onMessageDeleted(handleDeleted);
    onMessageReaction(handleReaction);
    onMessagesSeen(handleSeen);
    onTypingStart(handleTypingStart);
    onTypingStop(handleTypingStop);

    return () => {
      removeListener(SOCKET_EVENTS.RECEIVE_MESSAGE);
      removeListener(SOCKET_EVENTS.MESSAGE_EDITED);
      removeListener(SOCKET_EVENTS.MESSAGE_DELETED);
      removeListener(SOCKET_EVENTS.MESSAGE_REACTION);
      removeListener(SOCKET_EVENTS.MESSAGES_SEEN);
      removeListener(SOCKET_EVENTS.TYPING_START);
      removeListener(SOCKET_EVENTS.TYPING_STOP);
    };
  }, [conversation?._id, user?._id]);

  // Auto scroll
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length, typing]);

  const handleReply  = useCallback((msg) => { /* handled in ChatContext replyTo */ }, []);
  const handleUpdate = useCallback((msg) => updateMessage(msg), [updateMessage]);
  const handleDelete = useCallback((id)  => removeMessage(id),  [removeMessage]);

  if (!conversation?._id) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#030014] select-none gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 flex items-center justify-center">
          <span className="text-3xl">💬</span>
        </div>
        <div className="text-center">
          <p className="text-white font-semibold mb-1">Select a conversation</p>
          <p className="text-xs text-slate-500 font-mono">Choose from your chats or start a new one</p>
        </div>
      </div>
    );
  }

  const participant = conversation?.participants?.find(p => String(p._id) !== String(user?._id)) || conversation?.participant;
  const isOnline    = onlineUsers.includes(String(participant?._id));

  const rendered = [];
  let lastDate = null;
  messages.forEach((msg, i) => {
    const msgDate = new Date(msg.createdAt).toDateString();
    if (msgDate !== lastDate) {
      const { formatDateSeparator } = "../../shared/utils/formatDate";
      rendered.push(<DateSeparator key={`sep-${i}`} label={formatDateSeparator(msg.createdAt)} />);
      lastDate = msgDate;
    }
    rendered.push(
      <MessageBubble
        key={msg._id}
        message={msg}
        currentUserId={user?._id}
        conversationId={conversation._id}
        onReply={handleReply}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    );
  });

  return (
    <div className="h-full flex flex-col bg-[#030014] overflow-hidden">

      {/* HEADER */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-[#06031a]/50 backdrop-blur-xl z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm border border-white/10 shadow-md">
              {(participant?.username || "?").charAt(0).toUpperCase()}
            </div>
            {isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#06031a]" />}
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">{participant?.username || "Chat"}</h2>
            <p className="text-[10px] font-mono text-emerald-400">
              {isOnline ? "● online" : participant?.lastSeen ? `last seen ${formatLastSeen(participant.lastSeen)}` : "offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[Phone, Video, MoreVertical].map((Icon, i) => (
            <button key={i} className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-white/[0.05] scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 select-none gap-2">
            <span className="text-2xl">👋</span>
            <p className="text-xs font-mono">No messages yet — say hello!</p>
          </div>
        )}
        {rendered}
        {typing && <TypingIndicator typingUser={typing} />}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="flex-shrink-0">
        <MessageInput conversationId={conversation._id} currentUser={user} />
      </div>
    </div>
  );
};

export default ActiveChatPage;