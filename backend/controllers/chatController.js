import { getDB } from "../config/db.js";
import { createNotification } from "./notifController.js";

export const getChats = async (req, res) => {
  try {
    const db = await getDB();

    const [rows] = await db.query(
      `SELECT c.* 
       FROM chats c
       JOIN chat_usuarios cu ON cu.chat_id = c.id
       WHERE cu.user_id = ?`,
      [req.user.id]
    );

    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: "Error cargando chats" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDB();

    const [rows] = await db.query(
      `SELECT * FROM mensajes 
       WHERE chat_id = ? 
       ORDER BY creado_en ASC`,
      [id]
    );

    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: "Error cargando mensajes" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenido } = req.body;

    const db = await getDB();

    await db.query(
      `INSERT INTO mensajes (chat_id, remitente_id, contenido)
       VALUES (?, ?, ?)`,
      [id, req.user.id, contenido]
    );

    // identificar al otro usuario
    const [users] = await db.query(
      "SELECT user_id FROM chat_usuarios WHERE chat_id = ? AND user_id != ?",
      [id, req.user.id]
    );

    if (users.length > 0) {
      const receptor = users[0].user_id;

      await createNotification(
        receptor,
        "mensaje",
        "💬 Nuevo mensaje en el chat"
      );
    }

    res.json({ message: "Mensaje enviado" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error enviando mensaje" });
  }
};

export const createChat = async (req, res) => {
  try {
    const { otherUserId } = req.body;

    const db = await getDB();

    const [chatResult] = await db.query(
      "INSERT INTO chats (nombre) VALUES (?)",
      ["Chat privado"]
    );

    const chatId = chatResult.insertId;

    await db.query(
      "INSERT INTO chat_usuarios (chat_id, user_id) VALUES (?, ?), (?, ?)",
      [chatId, req.user.id, chatId, otherUserId]
    );

    res.json({ chatId });
  } catch (e) {
    res.status(500).json({ message: "Error creando chat" });
  }
};
