import express from "express";
import { protect } from "../middleware/auth.js";
import { me, updateProfile, discoverUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, me);
router.put("/update", protect, updateProfile);
router.get("/discover", protect, discoverUsers);

export default router;
