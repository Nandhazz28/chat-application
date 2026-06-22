
const USER_STATUS = {
  ONLINE: "online",
  OFFLINE: "offline",
};

const CONVERSATION_TYPE = {
  PRIVATE: "private",
  GROUP: "group",
};

const MESSAGE_TYPE = {
  TEXT: "text",
  IMAGE: "image",
  FILE: "file",
};

const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  JOIN_CONVERSATION: "join-conversation",
  LEAVE_CONVERSATION: "leave-conversation",

  SEND_MESSAGE: "send-message",
  RECEIVE_MESSAGE: "receive-message",

  MESSAGE_READ: "message-read",

  TYPING_START: "typing-start",
  TYPING_STOP: "typing-stop",

  USER_ONLINE: "user-online",
  USER_OFFLINE: "user-offline",
};

module.exports = {
  USER_STATUS,
  CONVERSATION_TYPE,
  MESSAGE_TYPE,
  SOCKET_EVENTS,
};