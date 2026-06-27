const registerTypingEvents = (io, socket) => {
  socket.on("join-conversation", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("leave-conversation", (conversationId) => {
    socket.leave(conversationId);
  });

  socket.on("typing-start", ({ conversationId, userId, username }) => {
    socket
      .to(conversationId)
      .emit("typing-start", { conversationId, userId, username });
  });

  socket.on("typing-stop", ({ conversationId, userId }) => {
    socket.to(conversationId).emit("typing-stop", { conversationId, userId });
  });
};

module.exports = registerTypingEvents;
