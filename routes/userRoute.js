import express from "express";

import { autherizedRole, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  getAllUsers,
  getSingleUser,
  updateUser,
  inactiveUser,
  deleteUser,
  activeUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/all", isAuthenticatedUser, getAllUsers);
router.put("/inactive/:id", isAuthenticatedUser, inactiveUser);
router.put("/active/:id", isAuthenticatedUser, activeUser);

router
  .route("/:id")
  .get(isAuthenticatedUser, getSingleUser)
  .put(isAuthenticatedUser, updateUser)
  .delete(isAuthenticatedUser, autherizedRole("admin"), deleteUser);

export default router;
