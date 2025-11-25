// backend/controllers/chatController.js
import { getDB } from "../config/db.js";

// Crear o devolver chat existente
export const getOrCreateChat = async (req, res) => {
  try {
    const user1 = req.user.id;
    const user2 = req.params.userId;

    const db = await getDB();

    // Buscar chat entre los 2
    const [rows] = await db.query(
      `SELECT * FROM chats 
       WHERE (user1_id = ? AND user2_id = ?) 
          OR (user1_id = ? AND user2_id = ?)`,
      [user1, user2, user2, user1]
    );

    if (rows.length > 0) {
      return res.json(rows[0]);
    }

    // Si no existe, lo creamos
    const [result] = await db.query(
      "INSERT INTO chats (user1_id, user2_id) VALUES (?, ?)",
      [user1, user2]
    );

    res.json({ id: result.insertId, user1_id: user1, user2_id: user2 });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al crear chat" });
  }
};

// Obtener mensajes del chat
export const getMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const db = await getDB();

    const [rows] = await db.query(
      "SELECT * FROM mensajes WHERE chat_id = ? ORDER BY created_at ASC",
      [chatId]
    );

    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al cargar mensajes" });
  }
};

// Enviar mensaje
export const sendMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const sender = req.user.id;
    const { contenido } = req.body;

    if (!contenido) {
      return res.status(400).json({ message: "Mensaje vacío" });
    }

    const db = await getDB();

    const [result] = await db.query(
      "INSERT INTO mensajes (chat_id, sender_id, contenido) VALUES (?, ?, ?)",
      [chatId, sender, contenido]
    );

    res.json({
      id: result.insertId,
      chat_id: chatId,
      sender_id: sender,
      contenido
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al enviar mensaje" });
  }
};

// Mis chats (lista)
export const myChats = async (req, res) => {
  try {
    const userId = req.user.id;
    const db = await getDB();

    const [rows] = await db.query(
      `SELECT c.id,
              IF(c.user1_id = ?, u2.nombre, u1.nombre) AS nombre,
              IF(c.user1_id = ?, u2.foto, u1.foto) AS foto
       FROM chats c
       JOIN users u1 ON u1.id = c.user1_id
       JOIN users u2 ON u2.id = c.user2_id
       WHERE c.user1_id = ? OR c.user2_id = ?`,
      [userId, userId, userId, userId]
    );

    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error al cargar chats" });
  }
};
