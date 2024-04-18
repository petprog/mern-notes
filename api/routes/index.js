import { Router } from "express";
import usersRouter from "./user.route.js";

const router = Router();

router.use("/api/user", usersRouter);
router.use("/", (req, res) => {
  res.send({ msg: "Hello World" });
});

export default router;
