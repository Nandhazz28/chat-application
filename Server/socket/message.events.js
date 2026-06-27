const registerMessageEvents = (io, socket) => {
  socket.on("send-message", (message) => {
    if (!message?.conversationId) return;
    socket.to(message.conversationId).emit("receive-message", message);
  });

  socket.on("message-edited", (message) => {
    if (!message?.conversationId) return;
    socket.to(message.conversationId).emit("message-edited", message);
  });

  socket.on("message-deleted", ({ conversationId, messageId, deleteFor }) => {
    if (!conversationId) return;
    socket.to(conversationId).emit("message-deleted", { messageId, deleteFor });
  });

  socket.on(
    "message-reaction",
    ({ conversationId, messageId, emoji, userId }) => {
      if (!conversationId) return;
      socket
        .to(conversationId)
        .emit("message-reaction", { messageId, emoji, userId });
    },
  );

  socket.on("messages-seen", ({ conversationId, userId }) => {
    if (!conversationId) return;
    socket.to(conversationId).emit("messages-seen", { conversationId, userId });
  });
};

module.exports = registerMessageEvents;

