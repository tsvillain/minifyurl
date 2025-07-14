import express from "express";
import logger from "./utils/logger";
import envConfig from "./config/env";
import { initDatabase } from "./config/database";
import ShortUrlRoutes from "./routes/url.routes";
import RedirectRoutes from "./routes/redirect.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const startServer = async () => {
  logger.info("Initializing Express app");
  const app = express();

  app.use(express.json());
  logger.info("Registered JSON middleware");

  // Log each incoming request
  app.use((req, res, next) => {
    logger.info(`[Request] ${req.method} ${req.originalUrl} from ${req.ip}`);
    next();
  });

  app.use("/api", ShortUrlRoutes);
  logger.info("Registered /api routes");

  app.use("/", RedirectRoutes);
  logger.info("Registered redirect routes");

  app.use(errorMiddleware);
  logger.info("Registered error middleware");

  try {
    logger.info("Initializing database connection");
    await initDatabase();
    app.listen(envConfig.PORT, () => {
      logger.info(`Server is running on port: ${envConfig.PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

startServer();
