import { getDB } from "../config/db.js";

// 🔥 FUNCIÓN QUE FALTABA (usada por matchController)
export const createNotification = async (userId, message) => {
  const db = await getDB();

  await db.query(
  "INSERT INTO notificaciones (user_id, mensaje) VALUES (?, ?)",
  [userId, contenido]
);
};

// 🔥 Obtener mis notificaciones
export const getMyNotifications = async (req, res) => {
  try {
    const db = await getDB();
    const [notifs] = await db.query(
      `SELECT * FROM notificaciones
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json(notifs);
  } catch (e) {
    console.error("Error notific:", e);
    res.status(500).json({ message: "Error del servidor" });
  }
};