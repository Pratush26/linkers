"use server"
import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

export default async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    return console.log("Already connected to the database");
  }

  if (!process.env.DB_URL) {
    throw new Error("DB Url not found");
  }

  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      dbName: "Linkers",
    });

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Failed to connect to the database");
  }
}