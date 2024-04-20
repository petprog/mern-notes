import { Router } from "express";
import {
  createNewUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
