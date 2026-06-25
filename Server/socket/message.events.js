const EVENTS = {
  SEND_MESSAGE: "send-message",
  RECEIVE_MESSAGE: "receive-message",
};

const registerMessageEvents = (io, socket) => {
  
  // Logic to handle incoming messages from a client
  socket.on(EVENTS.SEND_MESSAGE, (data) => {
    const { conversationId, senderId, text, timestamp } = data;

    // Create a message object to broadcast
    const messagePayload = {
      conversationId,
      senderId,
      text,
      timestamp: timestamp || new Date().toISOString(),
      messageId: Date.now(), // Simple unique ID; use a UUID library for production
    };

    // Broadcast the message to everyone in the specific conversation room
    // The sender will also receive this if you want to update their UI immediately,
    // or use socket.to(conversationId) to only send to others.
    io.to(conversationId).emit(EVENTS.RECEIVE_MESSAGE, messagePayload);
  });
};

module.exports = registerMessageEvents;