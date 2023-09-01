import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import errorMiddleware from "./middlewares/error.js";

//handle uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error 💥💥💥 : ${err.message}`);
  console.log(`Shutting down the server due to uncaughtException`);
  process.exit(1);
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

//error middleware
app.use(errorMiddleware);

export default app;
