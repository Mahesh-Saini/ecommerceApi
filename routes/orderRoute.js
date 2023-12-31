import express from "express";

import {
  addOrder,
  getAllOrders,
  updateOrder,
} from "../controllers/orderController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", isAuthenticatedUser, getAllOrders);
router.post("/add", isAuthenticatedUser, addOrder);

router.route("/:id").put(isAuthenticatedUser, updateOrder);

export default router;
