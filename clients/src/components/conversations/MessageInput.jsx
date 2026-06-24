import { useState } from "react";

const MessageInput = ({
  onSend,
}) => {
  const [text, setText] =
    useState("");

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t bg-white p-4 flex gap-2"
    >
      <input
        type="text"
        value={text}
        onChange={(e) =>
          setText(
            e.target.value
          )
        }
        placeholder="Type a message..."
        className="flex-1 border rounded-lg px-4 py-2"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-lg"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;