import express from "express";

import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import errorMiddleware from "./middlewares/error.js";

//handle uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error 💥💥💥 : ${err.message}`);
  console.log(`Shutting down the server due to uncaughtException`);
  process.exit(1);
});

const app = express();

app.use(express.json());

//routes
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);

//error middleware
app.use(errorMiddleware);

export default app;
