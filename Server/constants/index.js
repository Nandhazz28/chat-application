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
  AUDIO: "audio",
  FILE: "file",
};

const MESSAGE_STATUS = {
  SENDING: "sending",
  SENT: "sent",
  DELIVERED: "delivered",
  SEEN: "seen",
};

const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  JOIN_CONVERSATION: "join-conversation",
  LEAVE_CONVERSATION: "leave-conversation",

  SEND_MESSAGE: "send-message",
  RECEIVE_MESSAGE: "receive-message",

  MESSAGE_EDITED: "message-edited",
  MESSAGE_DELETED: "message-deleted",
  MESSAGE_REACTION: "message-reaction",
  MESSAGES_SEEN: "messages-seen",

  TYPING_START: "typing-start",
  TYPING_STOP: "typing-stop",

  USER_ONLINE: "user-online",
  USER_OFFLINE: "user-offline",

  ERROR: "error",
};

module.exports = {
  USER_STATUS,
  CONVERSATION_TYPE,
  MESSAGE_TYPE,
  MESSAGE_STATUS,
  SOCKET_EVENTS,
};