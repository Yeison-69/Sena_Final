import express from "express";
import { protect } from "../middleware/auth.js";
import { getMyNotifications, markAsRead } from "../controllers/notifController.js";

const router = express.Router();

router.get("/", protect, getMyNotifications);
router.put("/:id/read", protect, markAsRead);

export default router;
