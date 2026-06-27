const User = require("../modules/users/user.model");

const onlineUsers = new Map();

const registerPresenceEvents = (io, socket) => {
  socket.on("user-online", async (userId) => {
    if (!userId) return;
    if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
    onlineUsers.get(userId).add(socket.id);
    socket.userId = userId;

    if (onlineUsers.get(userId).size === 1) {
      await User.findByIdAndUpdate(userId, { isOnline: true, lastSeen: null });
      io.emit("user-online", userId);
    }
  });

  socket.on("disconnect", async () => {
    const userId = socket.userId;
    if (!userId) return;
    const sockets = onlineUsers.get(userId);
    if (sockets) {
      sockets.delete(socket.id);
      if (sockets.size === 0) {
        onlineUsers.delete(userId);
        await User.findByIdAndUpdate(userId, {
          isOnline: false,
          lastSeen: new Date(),
        });
        io.emit("user-offline", userId);
      }
    }
  });

  socket.on("user-offline", async (userId) => {
    if (!userId) return;
    const sockets = onlineUsers.get(userId);
    if (sockets) {
      sockets.delete(socket.id);
      if (sockets.size === 0) {
        onlineUsers.delete(userId);
        await User.findByIdAndUpdate(userId, {
          isOnline: false,
          lastSeen: new Date(),
        });
        io.emit("user-offline", userId);
      }
    }
  });
};

module.exports = registerPresenceEvents;
