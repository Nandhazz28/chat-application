module.exports = (io, socket) => {
  socket.on("join-conversation", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("leave-conversation", (conversationId) => {
    socket.leave(conversationId);
  });

  socket.on("send-message", (message) => {
    io.to(message.conversationId).emit(
      "receive-message",
      message
    );
  });

  socket.on("message-read", (data) => {
    io.to(data.conversationId).emit(
      "message-read",
      data
    );
  });
};