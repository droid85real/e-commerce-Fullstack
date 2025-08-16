import cors from "cors";
import { CLIENT_URL } from "./env";

export const corsOptions={
    origin: CLIENT_URL,
    // credentials: true // if you’ll ever use cookies/auth
};

export default cors(corsOptions);