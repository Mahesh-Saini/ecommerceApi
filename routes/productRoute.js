import express from "express";

import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  addProduct,
} from "../controllers/productController.js";
import { autherizedRole, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.post("/add", isAuthenticatedUser, autherizedRole("admin"), addProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete(isAuthenticatedUser, autherizedRole("admin"), deleteProduct)
  .put(isAuthenticatedUser, autherizedRole("admin"), updateProduct);

export default router;
