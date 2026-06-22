const { Server } = require("socket.io");

const registerMessageEvents = require("./message.events");
const registerTypingEvents = require("./typing.events");
const registerPresenceEvents = require("./presence.events");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket Connected: ${socket.id}`);

    registerMessageEvents(io, socket);
    registerTypingEvents(io, socket);
    registerPresenceEvents(io, socket);

    socket.on("disconnect", () => {
      console.log(`Socket Disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = initializeSocket;