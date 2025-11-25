import express from "express";
import { protect } from "../middleware/auth.js";
import { getMyNotifications } from "../controllers/notifController.js";

const router = express.Router();

router.get("/", protect, getMyNotifications);

export default router;
