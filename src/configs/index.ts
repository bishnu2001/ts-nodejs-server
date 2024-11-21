// import { config } from "dotenv";
import "dotenv/config";

const configs = {
  PORT: process.env.PORT,
  API_VERSION: `api/v1`,
  HOST: `${process.env.HOST}`,
  DB: process.env.DB,
  JWT_SECRET: process.env.JWT_SECRET,
  SECRET_KEY: `${process.env.SECRET_KEY}`,
  FIXED_IV:process.env.FIXED_IV,
  REDIS_URL:process.env.REDIS_URL
};
export { configs };
