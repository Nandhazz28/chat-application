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

export const joinChat = (
  conversationId
) => {
  socket.emit(
    SOCKET_EVENTS.JOIN_CHAT,
    conversationId
  );
};

export const leaveChat = (
  conversationId
) => {
  socket.emit(
    SOCKET_EVENTS.LEAVE_CHAT,
    conversationId
  );
};

export const sendMessage = (
  payload
) => {
  socket.emit(
    SOCKET_EVENTS.SEND_MESSAGE,
    payload
  );
};

export const sendTyping = (
  conversationId
) => {
  socket.emit(
    SOCKET_EVENTS.TYPING,
    conversationId
  );
};

export const stopTyping = (
  conversationId
) => {
  socket.emit(
    SOCKET_EVENTS.STOP_TYPING,
    conversationId
  );
};

export default socket;