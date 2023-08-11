import dotenv from "dotenv";

import app from "./app.js";
import { mongodbConnection } from "./db.js";

//configure dotenv
dotenv.config({ path: "./configs/.env" });

const PORT = process.env.port || 5000;

//mongodb connection
const MONGODB_URI = process.env.mongodbUri;

mongodbConnection(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`👽 Server is running on localhost:${PORT}`);
});
