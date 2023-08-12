import express from "express";

import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  addProduct,
} from "../controllers/productController.js";
import { isAuthenticatedUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.post("/add", isAuthenticatedUser, addProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete(isAuthenticatedUser, deleteProduct)
  .put(isAuthenticatedUser, updateProduct);

export default router;
