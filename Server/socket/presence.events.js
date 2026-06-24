const EVENTS = {
  USER_ONLINE:
    "user-online",

  USER_OFFLINE:
    "user-offline",
};

const onlineUsers =
  new Map();

const registerPresenceEvents = (
  io,
  socket
) => {
  socket.on(
    EVENTS.USER_ONLINE,
    (userId) => {
      onlineUsers.set(
        userId,
        socket.id
      );

      io.emit(
        EVENTS.USER_ONLINE,
        userId
      );
    }
  );

  socket.on(
    "disconnect",
    () => {
      let offlineUser =
        null;

      for (const [
        userId,
        socketId,
      ] of onlineUsers) {
        if (
          socketId === socket.id
        ) {
          offlineUser =
            userId;

          onlineUsers.delete(
            userId
          );

          break;
        }
      }

      if (offlineUser) {
        io.emit(
          EVENTS.USER_OFFLINE,
          offlineUser
        );
      }
    }
  );
};

module.exports =
  registerPresenceEvents;