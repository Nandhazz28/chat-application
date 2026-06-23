import ConversationItem from "./ConversationItem";

const ConversationList = ({
  conversations = [],
  activeId,
  onSelect,
  loading,
}) => {
  return (
    <div className="h-full overflow-y-auto bg-white border-r">

      {/* HEADER */}
      <div className="p-4 border-b font-semibold text-lg">
        Chats
      </div>

      {/* LIST */}
      {loading ? (
        <div className="p-4 text-gray-500 text-sm">
          Loading conversations...
        </div>
      ) : conversations.length === 0 ? (
        <div className="p-4 text-gray-400 text-sm">
          No conversations yet
        </div>
      ) : (
        conversations.map((conv) => (
          <ConversationItem
            key={conv._id}
            conversation={conv}
            active={activeId === conv._id}
            onClick={() => onSelect(conv)}
          />
        ))
      )}
    </div>
  );
};

export default ConversationList;