import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getOrCreateChat,
  getMessages,
  sendMessage,
  myChats
} from "../controllers/chatController.js";

const router = express.Router();

// 👉 lista de chats
router.get("/", protect, myChats);

// 👉 crear chat entre dos usuarios
router.get("/:userId/start", protect, getOrCreateChat);

// 👉 obtener mensajes (ruta estándar)
router.get("/:chatId", protect, getMessages);

// 👉 obtener mensajes (ruta usada por el frontend)
router.get("/:chatId/messages", protect, getMessages);

// 👉 enviar mensaje (ruta estándar)
router.post("/:chatId/message", protect, sendMessage);

// 👉 enviar mensaje (ruta usada por el frontend)
router.post("/:chatId/messages", protect, sendMessage);

export default router;
