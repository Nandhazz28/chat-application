const User = require("../modules/users/user.model");
const { SOCKET_EVENTS } = require("../constants");

// In-memory fallback (works fine for single-server; swap redis for multi-server)
const onlineSockets = new Map(); // userId -> Set<socketId>

const setUserOnline = async (io, userId) => {
  await User.findByIdAndUpdate(userId, { isOnline: true, lastSeen: null });
  io.emit(SOCKET_EVENTS.USER_ONLINE, userId);
};

const setUserOffline = async (io, userId) => {
  await User.findByIdAndUpdate(userId, {
    isOnline: false,
    lastSeen: new Date(),
  });
  io.emit(SOCKET_EVENTS.USER_OFFLINE, userId);
};

const registerPresenceEvents = (io, socket) => {
  const userId = socket.userId; // set by auth middleware in socket/index.js

  // Register this socket for the user
  if (!onlineSockets.has(userId)) {
    onlineSockets.set(userId, new Set());
  }
  onlineSockets.get(userId).add(socket.id);

  // Mark online if this is their first connection
  if (onlineSockets.get(userId).size === 1) {
    setUserOnline(io, userId).catch(console.error);
  }

  // Clean up on disconnect
  socket.on("disconnect", async () => {
    const sockets = onlineSockets.get(userId);
    if (!sockets) return;

    sockets.delete(socket.id);

    if (sockets.size === 0) {
      onlineSockets.delete(userId);
      try {
        await setUserOffline(io, userId);
      } catch (err) {
        console.error("[Presence] Failed to set user offline:", err.message);
      }
    }
  });
};

module.exports = registerPresenceEvents;