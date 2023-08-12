import express from "express";

import {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.post("/add", addUser);

router.route("/:id").put(updateUser).delete(deleteUser);

export default router;
