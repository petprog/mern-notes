import { Router } from "express";
import usersRouter from "./user.route.js";
import rootRouter from "./root.route.js";
import notesRouter from "./note.route.js";

const router = Router();

router.use("/api/user", usersRouter);
router.use("/api/note", notesRouter);
router.use("/", rootRouter);

export default router;
