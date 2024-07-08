import { Router } from "express";
import { UserController } from "../controller/UserController.js";
import { verifyJWT } from "../middleware/managerJwt.js";

const router = Router();

router.get("/users", verifyJWT, UserController.findAll);

router.get("/users/:username", UserController.findByUserName);

router.post("/users", verifyJWT, UserController.create);

export default router;
