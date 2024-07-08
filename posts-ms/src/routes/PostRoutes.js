import { Router } from "express";
import { PostController } from "../controller/PostController.js";
import { verifyJWT } from "../middleware/managerJwt.js";

const router = Router();

router.get("/posts", verifyJWT, PostController.findAll);

router.get("/posts/user/:id", verifyJWT, PostController.findByUserId);

router.post("/posts", verifyJWT, PostController.create);

export default router;
