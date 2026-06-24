import UserSearch from "./UserSearch";

const StartChatModal = ({
  open,
  onClose,
  onConversationCreated,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white w-[500px] rounded-xl p-4">

        <div className="flex justify-between mb-4">

          <h2 className="font-bold">
            New Chat
          </h2>

          <button
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <UserSearch
          onConversationCreated={
            onConversationCreated
          }
        />

      </div>

    </div>
  );
};

export default StartChatModal;