import { Router } from "express";
import { AuthenticateController } from "../controller/AuthenticateController.js";

const router = Router();

router.post("/authenticate", AuthenticateController.authenticate);

export default router;
