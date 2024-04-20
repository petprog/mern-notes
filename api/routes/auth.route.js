import { Router } from "express";
import {
  loginUser,
  refreshToken,
  logoutUser,
} from "../controllers/auth.controller.js";
import { loginLimiter } from "../middlewares/loginLimiter.js";

const router = Router();

router.route("/").post(loginLimiter, loginUser);
router.route("/refresh").get(refreshToken);
router.route("/logout").post(logoutUser);

export default router;
