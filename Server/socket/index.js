const { Server } = require("socket.io");
const { verifyAccessToken } = require("../utils/jwt");
const registerMessageEvents = require("./message.events");
const registerTypingEvents = require("./typing.events");
const registerPresenceEvents = require("./presence.events");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.use((socket, next) => {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authentication required"));
    }

    try {
      const decoded = verifyAccessToken(token);
      socket.userId = decoded.userId;
      next();
    } catch {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    registerMessageEvents(io, socket);
    registerTypingEvents(io, socket);
    registerPresenceEvents(io, socket);

    socket.on("error", (err) => {
      console.error(`[Socket Error] ${socket.id}:`, err.message);
    });
  });

  return io;
};

module.exports = initializeSocket;