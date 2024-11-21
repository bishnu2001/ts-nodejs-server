// import rateLimit from "express-rate-limit";
// import RedisStore from "rate-limit-redis"; // Make sure to use the right RedisStore
// import { client } from "../redis/redisclient";

// // Create reusable rate limit middleware
// const limiter = rateLimit({
//   store: new RedisStore({
//     client, // Use the ioredis client
//   }as any),
//   windowMs: 60 * 1000, // 1 minute window
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: "Too many requests, please try again later.",
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// export default limiter;
import rateLimit from 'express-rate-limit';

// Define the rate limiter configuration
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 10, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default limiter;

