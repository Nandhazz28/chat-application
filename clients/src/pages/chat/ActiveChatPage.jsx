import { useEffect, useRef, useState } from "react";
import { Hash, Radio, ShieldCheck } from "lucide-react";

import { getMessages } from "../../services/message.services";
import { sendMessage as sendMessageAPI } from "../../services/message.services";
import { useChatContext } from "../../shared/context/ChatContext";
import { useAuthContext } from "../../shared/context/AuthContext";

import MessageBubble from "../../components/conversations/MessageBubble";
import MessageInput from "../../components/conversations/MessageInput";
import TypingIndicator from "../../components/conversations/TypingIndicator";

import {
  joinConversation,
  leaveConversation,
  onReceiveMessage,
  onTypingStart,
  onTypingStop,
  removeListener,
} from "../../socket/socketManager";
import { SOCKET_EVENTS } from "../../socket/events";

const ActiveChatPage = ({ conversation }) => {
  const { messages, setMessages, typing, setTyping } = useChatContext();
  const { user } = useAuthContext();
  const [fetching, setFetching] = useState(false);
  const bottomRef = useRef(null);

  // Fetch messages + join socket room when conversation changes
  useEffect(() => {
    let isAlive = true;

    const fetchMessages = async () => {
      try {
        if (!conversation?._id) return;
        setFetching(true);
        const res = await getMessages(conversation._id);
        const messageData = res?.data || [];
        if (isAlive) setMessages(messageData);
      } catch (err) {
        console.error("Fetch messages error:", err);
        if (isAlive) setMessages([]);
      } finally {
        if (isAlive) setFetching(false);
      }
    };

    setMessages([]);
    setTyping(false);

    if (conversation?._id) {
      joinConversation(conversation._id);
    }

    fetchMessages();

    return () => {
      isAlive = false;
      if (conversation?._id) leaveConversation(conversation._id);
    };
  }, [conversation?._id]);

  // Socket listeners
  useEffect(() => {
    const handleNewMessage = (msg) => {
      if (msg.conversationId === conversation?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleTypingStart = () => setTyping(true);
    const handleTypingStop = () => setTyping(false);

    onReceiveMessage(handleNewMessage);
    onTypingStart(handleTypingStart);
    onTypingStop(handleTypingStop);

    return () => {
      removeListener(SOCKET_EVENTS.RECEIVE_MESSAGE);
      removeListener(SOCKET_EVENTS.TYPING_START);
      removeListener(SOCKET_EVENTS.TYPING_STOP);
    };
  }, [conversation?._id]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Derive participant for header
  const participant = conversation?.participants?.find(
    (p) => p._id !== user?._id
  ) || conversation?.participant;

  if (!conversation?._id) {
    return (
      <div className="h-full w-full bg-[#030014] flex flex-col items-center justify-center text-slate-400 gap-3 select-none">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Hash className="w-5 h-5 text-purple-400" />
        </div>
        <p className="text-sm font-mono tracking-wide">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#030014] relative overflow-hidden">

      {/* HEADER */}
      <div className="relative z-20 flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#080425]/60 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center font-bold text-white text-sm border border-white/10">
            {(participant?.username || participant?.name || "?").charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              {participant?.username || participant?.name || "Chat"}
            </h2>
            <div className="text-[9px] text-slate-400 flex items-center gap-1 font-mono">
              <Radio className="w-2.5 h-2.5 text-green-400" />
              Active Channel
            </div>
          </div>
        </div>
        <ShieldCheck className="w-4 h-4 text-purple-400" />
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-6 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {fetching && (
          <p className="text-xs text-slate-500 font-mono text-center py-4 animate-pulse">
            DECRYPTING LOGS...
          </p>
        )}

        {!fetching && messages.length === 0 && (
          <p className="text-xs text-slate-500 text-center mt-10 font-mono">
            No messages yet. Start the conversation 👇
          </p>
        )}

        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            currentUserId={user?._id}
          />
        ))}

        {typing && (
          <div className="animate-fade-in">
            <TypingIndicator user={participant} />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <MessageInput
        conversationId={conversation?._id}
        setMessages={setMessages}
      />
    </div>
  );
};

export default ActiveChatPage;