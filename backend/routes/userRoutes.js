import express from "express";
import { protect } from "../middleware/auth.js";
import { me, updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, me);
router.put("/update", protect, updateProfile);

export default router;
