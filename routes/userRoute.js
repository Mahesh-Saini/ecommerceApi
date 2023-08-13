import express from "express";

import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", isAuthenticatedUser, getAllUsers);

router
  .route("/:id")
  .put(isAuthenticatedUser, updateUser)
  .delete(isAuthenticatedUser, deleteUser);

export default router;
