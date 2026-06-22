const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token:
    process.env.UPSTASH_REDIS_REST_TOKEN,
});

const connectRedis = async () => {
  console.log(
    " Trying Upstash Redis connection..."
  );

  try {
    const result = await redis.ping();

    console.log(
      " Upstash Redis Connected"
    );

  } catch (error) {
    console.error(
      " Upstash Redis Connection Error:",
      error.message
    );
  }
};

module.exports = {
  redis,
  connectRedis,
};