import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors"
const app =express();
import {RouterPlugin,ListenerPlugin} from "./plugin";
import {configs} from "./configs/index";
import {connectRedisClient} from "./redis/redisclient";
app
  .use(cors())
  .use(express.json({ limit: "500mb" }))
  .use(express.urlencoded({ extended: true }))
  .use(fileUpload())
  .use(helmet());

async function main(){
    await mongoose.connect(configs.DB || "")
    console.log("DB connection successfull");
    await connectRedisClient();
}
main();
RouterPlugin.setup(app);
ListenerPlugin.listen(app)