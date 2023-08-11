import dotenv from "dotenv";
import app from "./app.js";

//configure dotenv
dotenv.config({ path: "./configs/.env" });

const PORT = process.env.port || 5000;

app.get("/", (req, res) => {
  res.send("hey i am listing..");
});

app.listen(PORT, () => {
  console.log(`👽 Server is running on localhost:${PORT}`);
});
