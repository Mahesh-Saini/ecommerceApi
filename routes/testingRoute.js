import express from "express";

import { getReq, postReq } from "../controllers/testingController.js";
const router = express.Router();

router.route("/").get(getReq);

router.route("/").post(postReq);

export default router;
