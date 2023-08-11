import express from "express";

import testingRouter from "./routes/testingRoute.js";
import productRouter from "./routes/productRoute.js";

const app = express();

app.use(express.json());

//routes
app.use("/api/v1/test", testingRouter);
app.use("/api/v1/product", productRouter);

export default app;
