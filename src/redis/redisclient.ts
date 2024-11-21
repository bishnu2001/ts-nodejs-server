import { createClient } from "redis";
import { configs } from "../configs";

export const client = createClient({
  url: configs.REDIS_URL || "",
});

export async function connectRedisClient() {
  try {
    await client.connect();
    console.log("Redis client connected");
  } catch (error) {
    console.error("Redis client connection error:", error);
  }

  client.on("error", (err) => {
    console.error("Redis client error:", err);
  });
}
