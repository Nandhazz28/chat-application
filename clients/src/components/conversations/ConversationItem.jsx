import OnlineIndicator from "./OnlineIndicator";
import UnreadBadge from "./UnreadBadge";

const ConversationItem = ({
  conversation,
  active,
  onClick,
  onlineUsers = [],
}) => {
  const user =
    conversation?.participant ||
    {};

  const isOnline =
    onlineUsers.includes(
      user._id
    );

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-4 border-b cursor-pointer transition-all
      ${
        active
          ? "bg-blue-50"
          : "hover:bg-gray-50"
      }`}
    >

      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
          {user?.name?.charAt(0) ||
            "U"}
        </div>

        <div className="absolute bottom-0 right-0">
          <OnlineIndicator
            online={isOnline}
          />
        </div>
      </div>


      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium truncate">
            {user?.name ||
              "Unknown User"}
          </h3>

          <UnreadBadge
            count={
              conversation?.unreadCount
            }
          />
        </div>

        <p className="text-sm text-gray-500 truncate">
          {conversation
            ?.lastMessage
            ?.content ||
            "No messages yet"}
        </p>
      </div>
    </div>
  );
};

export default ConversationItem;