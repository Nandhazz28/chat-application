const onlineUsers = new Map();

module.exports = (io, socket) => {
  socket.on("user-online", (userId) => {
    onlineUsers.set(userId, socket.id);

    io.emit("user-online", {
      userId,
    });
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);

        io.emit("user-offline", {
          userId,
        });

        break;
      }
    }
  });
};