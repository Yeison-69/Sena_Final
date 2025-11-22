import { getDB } from "../config/db.js";

export const getMyNotifications = async (req, res) => {
  try {
    const db = await getDB();
    const [rows] = await db.query(
      `SELECT * FROM notificaciones 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error obteniendo notificaciones" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDB();
    await db.query(
      "UPDATE notificaciones SET leida = 1 WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );

    res.json({ message: "Notificación marcada como leída" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error marcando como leída" });
  }
};

export const createNotification = async (userId, tipo, mensaje) => {
  try {
    const db = await getDB();
    await db.query(
      "INSERT INTO notificaciones (user_id, tipo, mensaje) VALUES (?, ?, ?)",
      [userId, tipo, mensaje]
    );
  } catch (e) {
    console.error("Error creando notificación:", e);
  }
};
