// env.js
import dotenv from "dotenv";

//configure dotenv
dotenv.config();

export const PORT=process.env.PORT || 5000;
