import express from "express";
import envConfig from "./config/env";
import { initDatabase } from "./config/database";
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Short URL");
});

app.listen(envConfig.PORT, () => {
  console.log(`Server is running on port: ${envConfig.PORT}`);
});

const startServer = async () => {
  try {
    await initDatabase();
  } catch (error) {
    console.error("Failed to start server: ", error);
    process.exit(1);
  }
};

startServer();
