import express from "express";
import { protect } from "../middleware/auth.js";
import { likeUser } from "../controllers/matchController.js";

const router = express.Router();

router.post("/like", protect, likeUser);

export default router;
