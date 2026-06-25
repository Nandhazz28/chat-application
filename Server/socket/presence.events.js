const EVENTS = {
  USER_ONLINE: "user-online",
  USER_OFFLINE: "user-offline",
};

const onlineUsers = new Map(); // Map<userId, Set<socketId>>

const registerPresenceEvents = (io, socket) => {
  socket.on(EVENTS.USER_ONLINE, (userId) => {
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    const userSockets = onlineUsers.get(userId);
    userSockets.add(socket.id);

    if (userSockets.size === 1) {
      io.emit(EVENTS.USER_ONLINE, userId);
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, sockets] of onlineUsers) {
      if (sockets.has(socket.id)) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          onlineUsers.delete(userId);
          io.emit(EVENTS.USER_OFFLINE, userId);
        }
        break;
      }
    }
  });
};

module.exports = registerPresenceEvents;