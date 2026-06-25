import { useEffect, useState } from "react";
import {
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Hash,
  Radio,
} from "lucide-react";

import { getMessages } from "../../services/conversation.services";
import { useChatContext } from "../../shared/context/ChatContext";

import MessageInput from "../../components/conversations/MessageInput";

const ActiveChatPage = ({ conversation }) => {
  const { messages, setMessages } = useChatContext();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    let isAlive = true;

    const fetchMessages = async () => {
      try {
        if (!conversation?._id) return;

        setFetching(true);

        const res = await getMessages(conversation._id);

        // ✅ FIX: correct backend structure
        const messageData = res?.data?.data || [];

        if (isAlive) {
          setMessages(messageData);
        }
      } catch (err) {
        console.error("Fetch messages error:", err);

        if (isAlive) {
          setMessages([]);
        }
      } finally {
        if (isAlive) setFetching(false);
      }
    };

    // clear old messages when switching chat
    setMessages([]);

    fetchMessages();

    return () => {
      isAlive = false;
    };
  }, [conversation?._id]);

  // NO CHAT SELECTED
  if (!conversation?._id) {
    return (
      <div className="h-full w-full bg-[#030014] flex items-center justify-center text-slate-400">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#030014] relative overflow-hidden">

      {/* HEADER */}
      <div className="relative z-20 flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#080425]/60 backdrop-blur-xl">

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <Hash className="w-4 h-4 text-pink-400" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">
              {conversation?.participant?.name || "Chat"}
            </h2>

            <div className="text-[9px] text-slate-400 flex items-center gap-1">
              <Radio className="w-3 h-3 text-green-400" />
              Online
            </div>
          </div>
        </div>

        <ShieldCheck className="w-4 h-4 text-purple-400" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3">

        {fetching && (
          <p className="text-sm text-gray-400">Loading...</p>
        )}

        {!fetching && messages.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-10">
            No messages yet. Start the conversation 👇
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white/5 px-4 py-2 rounded-lg w-fit max-w-[70%] text-white"
          >
            {msg.content}
          </div>
        ))}
      </div>

      <MessageInput
        conversationId={conversation?._id}
        setMessages={setMessages}
      />

    </div>
  );
};

export default ActiveChatPage;