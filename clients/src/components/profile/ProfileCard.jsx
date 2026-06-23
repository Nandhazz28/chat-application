const TypingIndicator = ({ user }) => {
  return (
    <div className="text-xs text-gray-500 px-2">
      {user?.name} is typing...
    </div>
  );
};

export default TypingIndicator;