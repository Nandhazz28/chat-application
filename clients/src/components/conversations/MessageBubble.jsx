const MessageBubble = ({ message, isOwn }) => {
  return (
    <div
      className={`flex ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow
        ${
          isOwn
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none"
        }`}
      >

        <p>{message.text}</p>

        {message.image && (
          <img
            src={message.image}
            alt="attachment"
            className="mt-2 rounded-lg"
          />
        )}

        <div className="text-[10px] mt-1 opacity-70 text-right">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

      </div>
    </div>
  );
};

export default MessageBubble;