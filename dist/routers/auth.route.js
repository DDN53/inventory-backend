import { Router } from "express";
import * as ctrlauth from "../controllers/auth.controller";
export const router = Router();
router.post("/register", ctrlauth.register);
// router.post("/login", ctrlauth.login);
// router.post("/refresh", ctrlauth.refresh);
