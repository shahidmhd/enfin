import Redis from "ioredis";

// Use REDIS_URL from environment variables
const redis = new Redis(process.env.REDIS_CONNECTION_URL);

redis.on("connect", () => {
  console.log("Redis is connected!");
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error);
});

export default redis;
