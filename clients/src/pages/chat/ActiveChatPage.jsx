import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { Phone, Video, MoreVertical, Loader2 } from "lucide-react";
import { getMessages, markSeen } from "../../services/message.services";
import { useChatContext } from "../../shared/context/ChatContext";
import { useAuthContext } from "../../shared/context/AuthContext";
import MessageBubble from "../../components/conversations/MessageBubble";
import MessageInput from "../../components/conversations/MessageInput";
import TypingIndicator from "../../components/conversations/TypingIndicator";
import { formatLastSeen, formatDateSeparator, isSameDay } from "../../shared/utils/formatDate";
import {
  joinConversation,
  leaveConversation,
  onReceiveMessage,
  onMessageEdited,
  onMessageDeleted,
  onMessageReaction,
  onMessagesSeen,
  onTypingStart,
  onTypingStop,
  removeListener,
  emitSeen,
} from "../../socket/socketManager";
import { SOCKET_EVENTS } from "../../socket/events";

// ── Date separator ────────────────────────────────────────────────────────────
const DateSeparator = ({ label }) => (
  <div className="flex items-center gap-3 my-4 px-4 select-none">
    <div className="flex-1 h-px bg-white/[0.05]" />
    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.02] border border-white/[0.05]">
      {label}
    </span>
    <div className="flex-1 h-px bg-white/[0.05]" />
  </div>
);

// ── Empty state ───────────────────────────────────────────────────────────────
const NoConversation = () => (
  <div className="h-full w-full flex flex-col items-center justify-center bg-[#030014] select-none gap-4">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 flex items-center justify-center">
      <span className="text-3xl">💬</span>
    </div>
    <div className="text-center">
      <p className="text-white font-semibold mb-1">Select a conversation</p>
      <p className="text-xs text-slate-500 font-mono">
        Choose from your chats or start a new one
      </p>
    </div>
  </div>
);

// ── Message skeleton ──────────────────────────────────────────────────────────
const MessageSkeleton = () => (
  <div className="flex flex-col gap-3 px-4 py-4">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"} animate-pulse`}
      >
        <div
          className={`h-10 rounded-2xl bg-white/[0.04] ${
            i % 2 === 0 ? "w-48" : "w-64"
          }`}
        />
      </div>
    ))}
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const ActiveChatPage = ({ conversation }) => {
  const {
    messages,
    setMessages,
    addMessage,
    updateMessage,
    removeMessage,
    typing,
    setTyping,
    onlineUsers,
  } = useChatContext();
  const { user } = useAuthContext();
  const bottomRef = useRef(null);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Stable callback refs so cleanup removes exactly these handlers
  const handlersRef = useRef({});

  // ── Load messages when conversation changes ─────────────────────────────────
  useEffect(() => {
    if (!conversation?._id) return;

    let alive = true;
    setMessages([]);
    setTyping(null);
    setLoadingMessages(true);
    joinConversation(conversation._id);

    const load = async () => {
      try {
        const res = await getMessages(conversation._id);
        if (!alive) return;
        // API shape: { success, data: [...messages] }
        setMessages(res?.data || []);
        // Mark seen + emit to other participants
        await markSeen(conversation._id).catch(() => {});
        emitSeen({ conversationId: conversation._id, userId: user?._id });
      } catch {
        if (alive) setMessages([]);
      } finally {
        if (alive) setLoadingMessages(false);
      }
    };

    load();

    return () => {
      alive = false;
      leaveConversation(conversation._id);
    };
  }, [conversation?._id]); 

  useEffect(() => {
    if (!conversation?._id) return;

    const handlers = {
      msg: (msg) => {
        if (msg.conversationId === conversation._id) addMessage(msg);
      },
      edited: (msg) => updateMessage(msg),
      deleted: ({ messageId, deleteFor }) => {
        if (deleteFor === "everyone") {
          removeMessage(messageId);
        } else {
          if (deleteFor === "me") removeMessage(messageId);
        }
      },
      reaction: ({ messageId, message: updatedMsg }) => {
        if (updatedMsg) updateMessage(updatedMsg);
      },
      seen: ({ conversationId: cId }) => {
        if (cId === conversation._id) {
          setMessages((prev) =>
            prev.map((m) => ({ ...m, status: "seen" }))
          );
        }
      },
      typingStart: ({ userId, username }) => {
        if (String(userId) !== String(user?._id)) {
          setTyping({ userId, username });
        }
      },
      typingStop: ({ userId }) => {
        setTyping((prev) =>
          prev?.userId === userId ? null : prev
        );
      },
    };

    handlersRef.current.msg = onReceiveMessage(handlers.msg);
    handlersRef.current.edited = onMessageEdited(handlers.edited);
    handlersRef.current.deleted = onMessageDeleted(handlers.deleted);
    handlersRef.current.reaction = onMessageReaction(handlers.reaction);
    handlersRef.current.seen = onMessagesSeen(handlers.seen);
    handlersRef.current.typingStart = onTypingStart(handlers.typingStart);
    handlersRef.current.typingStop = onTypingStop(handlers.typingStop);

    return () => {
      removeListener(SOCKET_EVENTS.RECEIVE_MESSAGE, handlersRef.current.msg);
      removeListener(SOCKET_EVENTS.MESSAGE_EDITED, handlersRef.current.edited);
      removeListener(SOCKET_EVENTS.MESSAGE_DELETED, handlersRef.current.deleted);
      removeListener(SOCKET_EVENTS.MESSAGE_REACTION, handlersRef.current.reaction);
      removeListener(SOCKET_EVENTS.MESSAGES_SEEN, handlersRef.current.seen);
      removeListener(SOCKET_EVENTS.TYPING_START, handlersRef.current.typingStart);
      removeListener(SOCKET_EVENTS.TYPING_STOP, handlersRef.current.typingStop);
    };
  }, [conversation?._id, user?._id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, typing]);

  const handleUpdate = useCallback((msg) => updateMessage(msg), [updateMessage]);
  const handleDelete = useCallback((id) => removeMessage(id), [removeMessage]);

 
  const { setReplyTo } = useChatContext();
  const handleReply = useCallback(
    (msg) => setReplyTo(msg),
    [setReplyTo]
  );

  const renderedMessages = useMemo(() => {
    const items = [];
    let lastDate = null;

    messages.forEach((msg, i) => {
      const msgDate = new Date(msg.createdAt).toDateString();
      if (msgDate !== lastDate) {
        items.push(
          <DateSeparator
            key={`sep-${i}`}
            label={formatDateSeparator(msg.createdAt)}
          />
        );
        lastDate = msgDate;
      }
      items.push(
        <MessageBubble
          key={msg._id}
          message={msg}
          currentUserId={user?._id}
          conversationId={conversation?._id}
          onReply={handleReply}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      );
    });

    return items;
  }, [messages, user?._id, conversation?._id, handleReply, handleUpdate, handleDelete]);

  if (!conversation?._id) return <NoConversation />;

  const participant =
    conversation?.participants?.find(
      (p) => String(p._id) !== String(user?._id)
    ) || conversation?.participant;
  const isOnline = onlineUsers.includes(String(participant?._id));

  return (
    <div className="h-full flex flex-col bg-[#030014] overflow-hidden">
      <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-[#06031a]/50 backdrop-blur-xl z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm border border-white/10 shadow-md">
              {(participant?.username || "?").charAt(0).toUpperCase()}
            </div>
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#06031a]" />
            )}
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">
              {participant?.username || "Chat"}
            </h2>
            <p className="text-[10px] font-mono text-emerald-400">
              {isOnline
                ? "● online"
                : participant?.lastSeen
                ? `last seen ${formatLastSeen(participant.lastSeen)}`
                : "● offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[Phone, Video, MoreVertical].map((Icon, i) => (
            <button
              key={i}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-white/[0.05] scrollbar-track-transparent">
        {loadingMessages ? (
          <MessageSkeleton />
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 select-none gap-2">
            <span className="text-2xl">👋</span>
            <p className="text-xs font-mono">No messages yet — say hello!</p>
          </div>
        ) : (
          renderedMessages
        )}
        {typing && <TypingIndicator typingUser={typing} />}
        <div ref={bottomRef} />
      </div>

      <div className="flex-shrink-0">
        <MessageInput conversationId={conversation._id} currentUser={user} />
      </div>
    </div>
  );
};

export default ActiveChatPage;