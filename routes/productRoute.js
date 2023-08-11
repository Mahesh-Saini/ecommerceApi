import express from "express";

import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  addProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.post("/add", addProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .put(updateProduct);

export default router;
