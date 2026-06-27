const { SOCKET_EVENTS } = require("../constants");

const registerTypingEvents = (io, socket) => {
  socket.on(SOCKET_EVENTS.JOIN_CONVERSATION, (conversationId) => {
    if (!conversationId) return;
    socket.join(conversationId);
  });

  socket.on(SOCKET_EVENTS.LEAVE_CONVERSATION, (conversationId) => {
    if (!conversationId) return;
    socket.leave(conversationId);
  });

  socket.on(SOCKET_EVENTS.TYPING_START, ({ conversationId, userId, username }) => {
    if (!conversationId) return;
    socket
      .to(conversationId)
      .emit(SOCKET_EVENTS.TYPING_START, { conversationId, userId, username });
  });

  socket.on(SOCKET_EVENTS.TYPING_STOP, ({ conversationId, userId }) => {
    if (!conversationId) return;
    socket
      .to(conversationId)
      .emit(SOCKET_EVENTS.TYPING_STOP, { conversationId, userId });
  });
};

module.exports = registerTypingEvents;