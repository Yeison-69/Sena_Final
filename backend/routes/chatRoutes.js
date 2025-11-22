import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getChats,
  getMessages,
  sendMessage,
  createChat
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/", protect, getChats);
router.get("/:id/messages", protect, getMessages);
router.post("/:id/message", protect, sendMessage);
router.post("/create", protect, createChat);

export default router;
