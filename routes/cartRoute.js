import express from "express";

import {
  addCart,
  getAllCart,
  updateCart,
  deleteCart,
} from "../controllers/cartController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", isAuthenticatedUser, getAllCart);
router.post("/add", isAuthenticatedUser, addCart);

router
  .route("/:id")
  .put(isAuthenticatedUser, updateCart)
  .delete(isAuthenticatedUser, deleteCart);

export default router;
