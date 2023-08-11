import express from "express";

import { getReq, postReq } from "../controllers/testingController.js";

// //handle uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.log(`Error 💥💥💥 : ${err.message}`);
//   console.log(`Shutting down the server due to uncaughtException`);
//   process.exit(1);
// });

const router = express.Router();

router.route("/").get(getReq);

router.route("/").post(postReq);

export default router;
// console.log(hello);
