import socket from "./index";
import { SOCKET_EVENTS } from "./events";



export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

/* =========================
   PRESENCE
========================= */

export const userOnline = (userId) => {
  socket.emit(
    SOCKET_EVENTS.USER_ONLINE,
    userId
  );
};

export const userOffline = (userId) => {
  socket.emit(
    SOCKET_EVENTS.USER_OFFLINE,
    userId
  );
};

/* =========================
   CONVERSATIONS
========================= */

export const joinConversation = (
  conversationId
) => {
  socket.emit(
    SOCKET_EVENTS.JOIN_CONVERSATION,
    conversationId
  );
};

export const leaveConversation = (
  conversationId
) => {
  socket.emit(
    SOCKET_EVENTS.LEAVE_CONVERSATION,
    conversationId
  );
};

/* =========================
   MESSAGES
========================= */

export const sendMessage = (
  message
) => {
  socket.emit(
    SOCKET_EVENTS.SEND_MESSAGE,
    message
  );
};

export const markMessageSeen = (
  messageId
) => {
  socket.emit(
    SOCKET_EVENTS.MESSAGE_SEEN,
    messageId
  );
};

/* =========================
   TYPING
========================= */

export const typingStart = (
  conversationId
) => {
  socket.emit(
    SOCKET_EVENTS.TYPING_START,
    conversationId
  );
};

export const typingStop = (
  conversationId
) => {
  socket.emit(
    SOCKET_EVENTS.TYPING_STOP,
    conversationId
  );
};

/* =========================
   LISTENERS
========================= */

export const onReceiveMessage = (
  callback
) => {
  socket.on(
    SOCKET_EVENTS.RECEIVE_MESSAGE,
    callback
  );
};

export const onTypingStart = (
  callback
) => {
  socket.on(
    SOCKET_EVENTS.TYPING_START,
    callback
  );
};

export const onTypingStop = (
  callback
) => {
  socket.on(
    SOCKET_EVENTS.TYPING_STOP,
    callback
  );
};

export const onUserOnline = (
  callback
) => {
  socket.on(
    SOCKET_EVENTS.USER_ONLINE,
    callback
  );
};

export const onUserOffline = (
  callback
) => {
  socket.on(
    SOCKET_EVENTS.USER_OFFLINE,
    callback
  );
};

export const removeListener = (
  event
) => {
  socket.off(event);
};

export default socket;