import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import routes from "./routes/index.js";
import { corsOptions } from "./configs/corsOptions.js";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";

export default function createApp() {
  const __dirname = path.resolve();
  const app = express();
  app.use(logger);
  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(cookieParser());

  app.use(routes);

  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });

  // app.use((err, req, res, next) => {
  //   const statusCode = err.statusCode || 500;
  //   const message = err.message || "Internal Server Error";
  //   return res.status(statusCode).send({
  //     success: false,
  //     statusCode,
  //     message,
  //   });
  // });

  app.use(errorHandler);

  return app;
}
