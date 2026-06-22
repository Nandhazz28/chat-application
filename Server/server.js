require("dotenv").config();

const http = require("http");

const app = require("./app");
const env = require("./config/env");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");
const initializeSocket = require("./socket");

const startServer = async () => {
  try {
    await connectDB();

    if (
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      await connectRedis();
    }

    const server = http.createServer(app);

    initializeSocket(server);

    server.listen(env.PORT, () => {
      console.log(
        ` Server running on port ${env.PORT}`
      );
    });
  } catch (error) {
    console.error(
      " Server Startup Error:",
      error
    );

    process.exit(1);
  }
};

startServer();