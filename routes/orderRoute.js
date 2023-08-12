import express from "express";

import {
  addOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/all", getAllOrders);
router.post("/add", addOrder);

router.route("/:id").put(updateOrder).delete(deleteOrder);

export default router;
