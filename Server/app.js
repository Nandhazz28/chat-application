const express = require("express");
const cors = require("cors");

const notFound = require(
  "./middleware/notFound.middleware"
);

const errorHandler = require(
  "./middleware/error.middleware"
);

const authRoutes = require(
  "./modules/auth/auth.routes"
);

const userRoutes = require(
  "./modules/users/user.routes"
);

const conversationRoutes = require(
  "./modules/conversations/conversation.routes"
);

const messageRoutes = require(
  "./modules/messages/message.routes"
);

const uploadRoutes = require(
  "./modules/uploads/upload.routes"
);

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/conversations",
  conversationRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);

app.use(
  "/api/uploads",
  uploadRoutes
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Chat API Running",
  });
});

app.use(notFound);

app.use(errorHandler);

module.exports = app;