import mongoose from "mongoose";
import "dotenv/config";
const db = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

export default db;
