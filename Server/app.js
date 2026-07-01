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

const allowedOrigins = [
  "http://localhost:5173",
  "https://opentunnel.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
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

app.use(notFound);
app.use(errorHandler);

module.exports = app;
