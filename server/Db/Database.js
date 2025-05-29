import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGODB_URI;

/************************************************************************************
 * Start Database Connection
 ************************************************************************************/
export default async function Database() {
  try {
    await mongoose.connect(`${MONGO_URI}/3section`);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}


