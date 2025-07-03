import express from "express";
import envConfig from "./config/env";
import { initDatabase } from "./config/database";
import ShortUrlRoutes from "./routes/short_url.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const startServer = async () => {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Welcome to Short URL");
  });

  app.use("/api", ShortUrlRoutes);

  app.use(errorMiddleware);

  try {
    await initDatabase();
    app.listen(envConfig.PORT, () => {
      console.log(`Server is running on port: ${envConfig.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server: ", error);
    process.exit(1);
  }
};

startServer();
