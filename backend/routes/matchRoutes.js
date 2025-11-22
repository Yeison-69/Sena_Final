import express from "express";
import { protect } from "../middleware/auth.js";
import { sendLike, getMatches } from "../controllers/matchController.js";
import { createNotification } from "../controllers/notifController.js";



const router = express.Router();

router.post("/like", protect, sendLike);
router.get("/mine", protect, getMatches);

export default router;
