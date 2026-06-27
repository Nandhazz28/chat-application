const { SOCKET_EVENTS } = require("../constants");

const registerMessageEvents = (io, socket) => {
  socket.on(SOCKET_EVENTS.SEND_MESSAGE, (message) => {
    if (!message?.conversationId) return;
    socket
      .to(message.conversationId)
      .emit(SOCKET_EVENTS.RECEIVE_MESSAGE, message);
  });

  socket.on(SOCKET_EVENTS.MESSAGE_EDITED, (message) => {
    if (!message?.conversationId) return;
    socket
      .to(message.conversationId)
      .emit(SOCKET_EVENTS.MESSAGE_EDITED, message);
  });

  socket.on(SOCKET_EVENTS.MESSAGE_DELETED, ({ conversationId, messageId, deleteFor }) => {
    if (!conversationId || !messageId) return;
    socket
      .to(conversationId)
      .emit(SOCKET_EVENTS.MESSAGE_DELETED, { messageId, deleteFor });
  });

  socket.on(SOCKET_EVENTS.MESSAGE_REACTION, ({ conversationId, messageId, message }) => {
    if (!conversationId || !messageId) return;
    socket
      .to(conversationId)
      .emit(SOCKET_EVENTS.MESSAGE_REACTION, { messageId, message });
  });

  socket.on(SOCKET_EVENTS.MESSAGES_SEEN, ({ conversationId, userId }) => {
    if (!conversationId) return;
    socket
      .to(conversationId)
      .emit(SOCKET_EVENTS.MESSAGES_SEEN, { conversationId, userId });
  });
};

module.exports = registerMessageEvents;