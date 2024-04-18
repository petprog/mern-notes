import dotenv from "dotenv";
dotenv.config();
import App from "./createApp.js";
import { connectMongoDB } from "./configs/mongoDBConnect.js";
import mongoose from "mongoose";
import { logEvents } from "./middlewares/logger.js";

connectMongoDB();

const app = App();

const PORT = process.env.PORT || 3000;

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrlog.log"
  );
});
