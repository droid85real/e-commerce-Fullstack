import cors from "cors";
import { CLIENT_URL } from "./env.js";

export const corsOptions={
    origin: CLIENT_URL,
    // credentials: true // if you’ll ever use cookies/auth
};
// In your backend, check what CLIENT_URL is set to
console.log('CLIENT_URL:', process.env.CLIENT_URL);

export default cors(corsOptions);