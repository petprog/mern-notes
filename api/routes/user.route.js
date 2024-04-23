import { Router } from "express";
import {
  createNewUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { verifyRoles } from "../middlewares/verifyRoles.js";
import { ROLES_LIST } from "../configs/roles_list.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getAllUsers)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), createNewUser)
  .patch(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), deleteUser);

export default router;
