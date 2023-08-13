import express from "express";
import {
  changePassword,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/authController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticatedUser, logout);
router.post("/password/forgot", forgotPassword);
router.put("/password/change", isAuthenticatedUser, changePassword);
router.put("/password/reset/:token", resetPassword);

export default router;
