module.exports = (io, socket) => {
  socket.on("typing-start", (data) => {
    socket.to(data.conversationId).emit(
      "typing-start",
      {
        userId: data.userId,
      }
    );
  });

  socket.on("typing-stop", (data) => {
    socket.to(data.conversationId).emit(
      "typing-stop",
      {
        userId: data.userId,
      }
    );
  });
};