import express from "express";

import {
  addCart,
  getAllCart,
  updateCart,
  deleteCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/all", getAllCart);
router.post("/add", addCart);

router.route("/:id").put(updateCart).delete(deleteCart);

export default router;
