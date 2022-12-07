import dotenv from "dotenv";
dotenv.config({ path: './config/.env' });

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || "";