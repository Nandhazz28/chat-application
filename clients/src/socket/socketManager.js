import socket from "./index";
import { SOCKET_EVENTS } from "./events";

export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};
export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

export const userOnline = (userId) =>
  socket.emit(SOCKET_EVENTS.USER_ONLINE, userId);
export const userOffline = (userId) =>
  socket.emit(SOCKET_EVENTS.USER_OFFLINE, userId);

export const joinConversation = (id) =>
  socket.emit(SOCKET_EVENTS.JOIN_CONVERSATION, id);
export const leaveConversation = (id) =>
  socket.emit(SOCKET_EVENTS.LEAVE_CONVERSATION, id);

export const sendMessage = (msg) =>
  socket.emit(SOCKET_EVENTS.SEND_MESSAGE, msg);
export const emitMessageEdit = (msg) =>
  socket.emit(SOCKET_EVENTS.MESSAGE_EDITED, msg);
export const emitMessageDelete = (data) =>
  socket.emit(SOCKET_EVENTS.MESSAGE_DELETED, data);
export const emitReaction = (data) =>
  socket.emit(SOCKET_EVENTS.MESSAGE_REACTION, data);
export const emitSeen = (data) =>
  socket.emit(SOCKET_EVENTS.MESSAGES_SEEN, data);

export const typingStart = (conversationId, userId, username) =>
  socket.emit(SOCKET_EVENTS.TYPING_START, { conversationId, userId, username });
export const typingStop = (conversationId, userId) =>
  socket.emit(SOCKET_EVENTS.TYPING_STOP, { conversationId, userId });

export const onReceiveMessage = (cb) =>
  socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, cb);
export const onMessageEdited = (cb) =>
  socket.on(SOCKET_EVENTS.MESSAGE_EDITED, cb);
export const onMessageDeleted = (cb) =>
  socket.on(SOCKET_EVENTS.MESSAGE_DELETED, cb);
export const onMessageReaction = (cb) =>
  socket.on(SOCKET_EVENTS.MESSAGE_REACTION, cb);
export const onMessagesSeen = (cb) =>
  socket.on(SOCKET_EVENTS.MESSAGES_SEEN, cb);
export const onTypingStart = (cb) => socket.on(SOCKET_EVENTS.TYPING_START, cb);
export const onTypingStop = (cb) => socket.on(SOCKET_EVENTS.TYPING_STOP, cb);
export const onUserOnline = (cb) => socket.on(SOCKET_EVENTS.USER_ONLINE, cb);
export const onUserOffline = (cb) => socket.on(SOCKET_EVENTS.USER_OFFLINE, cb);

export const removeListener = (event) => socket.off(event);
export default socket;
