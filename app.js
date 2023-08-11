import express from "express";

import testingRouter from "./routes/testingRoute.js";

const app = express();

app.use(express.json());

//routes
app.use("/api/v1", testingRouter);
app.get("/", (req, res) => {
  res.send("hey i am listing..");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

export default app;
