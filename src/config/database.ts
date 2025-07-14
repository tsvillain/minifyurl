import mongoose from "mongoose";
import envConfig from "./env";
import logger from "../utils/logger";

export const initDatabase = async () => {
  try {
    logger.info("Connecting to MongoDB...");
    await mongoose.connect(envConfig.DATABASE_URL);
    logger.info("Connected to MongoDB");

    mongoose.connection.on("error", (error) => {
      logger.error(`MongoDB connection error: ${error}`);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    mongoose.connection.on("connected", () => {
      logger.info("MongoDB connection established");
    });

    mongoose.connection.on("reconnected", () => {
      logger.info("MongoDB reconnected");
    });
  } catch (error) {
    logger.error(`Failed to connect to MongoDB: ${error}`);
    throw new Error("Database connection failed");
  }
};
