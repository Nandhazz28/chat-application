import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({
  messages = [],
  onSend,
  typingUser,
  currentUserId,
  loading,
}) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">

      {/* HEADER */}
      <div className="p-4 border-b bg-white font-medium">
        Chat
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading && (
          <p className="text-sm text-gray-500">
            Loading messages...
          </p>
        )}

        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwn={msg.senderId === currentUserId}
          />
        ))}

        {typingUser && (
          <TypingIndicator user={typingUser} />
        )}
      </div>

      {/* INPUT */}
      <MessageInput onSend={onSend} />
    </div>
  );
};

export default ChatWindow;