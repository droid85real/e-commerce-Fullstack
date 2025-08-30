// env.js
import dotenv from "dotenv";

//configure dotenv
dotenv.config();

export const PORT=process.env.PORT || 5000;
export const CLIENT_URL=process.env.CLIENT_URL || "http://localhost:5173";
export const PEPPER_SECRET=process.env.PEPPER_SECRET || "some_random_string";
export const SECRET_KEY=process.env.SECRET_KEY || "some_secret_key";