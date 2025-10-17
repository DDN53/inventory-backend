import { Router } from "express";
import * as ctrl from "../controllers/product.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requirePermission } from "../middleware/rbac.js";

export const router = Router();
router.get("/", requireAuth, requirePermission("product.read"), ctrl.list);
router.post("/produts", requireAuth, requirePermission("product.create"), ctrl.create);
router.put("/:id", requireAuth, requirePermission("product.update"), ctrl.update);
router.delete("/:id", requireAuth, requirePermission("product.delete"), ctrl.remove);