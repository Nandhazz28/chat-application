const EVENTS = {
  JOIN_CONVERSATION: "join-conversation",
  LEAVE_CONVERSATION: "leave-conversation",
  TYPING_START: "typing-start",
  TYPING_STOP: "typing-stop",
};

const registerTypingEvents = (io, socket) => {
  socket.on(EVENTS.JOIN_CONVERSATION, (conversationId) => {
    socket.join(conversationId);
  });

  socket.on(EVENTS.LEAVE_CONVERSATION, (conversationId) => {
    socket.leave(conversationId);
  });

  socket.on(EVENTS.TYPING_START, ({ conversationId, userId }) => {
    socket.to(conversationId).emit(EVENTS.TYPING_START, { conversationId, userId });
  });

  socket.on(EVENTS.TYPING_STOP, ({ conversationId, userId }) => {
    socket.to(conversationId).emit(EVENTS.TYPING_STOP, { conversationId, userId });
  });
};

module.exports = registerTypingEvents;