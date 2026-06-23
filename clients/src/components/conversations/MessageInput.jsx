import { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSend?.(text);
    setText("");
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t bg-white">

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600"
      >
        Send
      </button>

    </div>
  );
};

export default MessageInput;