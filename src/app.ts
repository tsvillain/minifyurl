import express from "express";
import envConfig from "./config/env";
import { initDatabase } from "./config/database";
import ShortUrlRoutes from "./routes/url.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const startServer = async () => {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Welcome to Short URL");
  });
  
  app.use("/api", ShortUrlRoutes);

  // TODO: Create new route to redirect user to original url

  // TODO: Create middleware to increment the visit_count
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
