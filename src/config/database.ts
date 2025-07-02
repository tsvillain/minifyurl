import mongoose from "mongoose";
import envConfig from "./env";

export const initDatabase = async () => {
  try {
    await mongoose.connect(envConfig.DATABASE_URL);
    console.log("Connected to MongoDB");

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error: ", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB: ", error);
    throw new Error("Database connection failed");
  }
};
