import { Router } from "express";
import {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { verifyRoles } from "../middlewares/verifyRoles.js";
import { ROLES_LIST } from "../configs/roles_list.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), deleteNote);

export default router;
