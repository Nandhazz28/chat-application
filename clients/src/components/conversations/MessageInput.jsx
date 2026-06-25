import { useState } from "react";
import { SendHorizontal, Paperclip, Mic } from "lucide-react";
import api from "../../services/axios";

const MessageInput = ({ conversationId, setMessages }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !conversationId) return;

    try {
      setLoading(true);

      const res = await api.post("/api/messages", {
        conversationId,
        content: text,
      });

      const newMessage = res?.data?.data;

      // 🔥 INSTANT UI UPDATE
      setMessages((prev) => [...prev, newMessage]);

      setText("");
    } catch (err) {
      console.error("Send error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t border-white/10">

      <button type="button">
        <Paperclip className="w-4 h-4" />
      </button>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
        className="flex-1 bg-transparent border px-3 py-2 rounded text-white"
      />

      <button type="button">
        <Mic className="w-4 h-4" />
      </button>

      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 px-3 py-2 rounded text-white"
      >
        <SendHorizontal className="w-4 h-4" />
      </button>
    </form>
  );
};

export default MessageInput;