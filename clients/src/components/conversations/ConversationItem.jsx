const ConversationItem = ({
  conversation,
  active,
  onClick,
}) => {
  const user = conversation.participant;

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-4 cursor-pointer border-b transition
      ${
        active
          ? "bg-blue-50"
          : "hover:bg-gray-50"
      }`}
    >

      {/* AVATAR */}
      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
        {user?.name?.charAt(0)}
      </div>

      {/* INFO */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm">
            {user?.name}
          </h3>

          {conversation.unreadCount > 0 && (
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              {conversation.unreadCount}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500 truncate">
          {conversation.lastMessage?.text ||
            "No messages yet"}
        </p>
      </div>

    </div>
  );
};

export default ConversationItem;