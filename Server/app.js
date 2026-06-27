const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { apiLimiter } = require("./middleware/rateLimit.middleware");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const conversationRoutes = require("./modules/conversations/conversation.routes");
const messageRoutes = require("./modules/messages/message.routes");
const uploadRoutes = require("./modules/uploads/upload.routes");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api", apiLimiter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Chat API Running" });
});

// Routes
try {
  app.use("/api/auth", authRoutes);
  console.log("✅ auth");

  app.use("/api/users", userRoutes);
  console.log("✅ users");

  app.use("/api/conversations", conversationRoutes);
  console.log("✅ conversations");

  app.use("/api/messages", messageRoutes);
  console.log("✅ messages");

  app.use("/api/uploads", uploadRoutes);
  console.log("✅ uploads");
} catch (err) {
  console.error(err);
}

// Not found and error handlers (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;