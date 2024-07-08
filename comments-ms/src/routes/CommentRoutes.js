import { Router } from "express";
import { CommentController } from "../controller/CommentController.js";
import { verifyJWT } from "../middleware/managerJwt.js";

const router = Router();

router.get("/comments", verifyJWT, CommentController.findAll);

router.post("/comments", verifyJWT, CommentController.create);

router.get("/comments/post/:id", verifyJWT, CommentController.findByPostId);

export default router;
