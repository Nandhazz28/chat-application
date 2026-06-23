import ChatWindow from "../../components/conversations/ChatWindow";

const ActiveChatPage = ({
  conversation,
}) => {
  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a conversation
      </div>
    );
  }

  const messages = [
    {
      _id: "1",
      text: "Hello",
      senderId: "user1",
      createdAt: Date.now(),
    },
    {
      _id: "2",
      text: "Hi bro",
      senderId: "me",
      createdAt: Date.now(),
    },
  ];

  const handleSend = (text) => {
    console.log("Send:", text);
  };

  return (
    <ChatWindow
      messages={messages}
      currentUserId="me"
      onSend={handleSend}
    />
  );
};

export default ActiveChatPage;