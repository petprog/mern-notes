import { Router } from "express";
import {
  createNewUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
