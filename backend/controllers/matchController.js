import { getDB } from "../config/db.js";
import { createNotification } from "./notifController.js";

export const sendLike = async (req, res) => {
  try {
    const db = await getDB();
    const userId = req.user.id;
    const { likedUserId } = req.body;

    // registrar like
    await db.query(
      "INSERT IGNORE INTO likes (user_id, liked_user_id) VALUES (?, ?)",
      [userId, likedUserId]
    );

    // verificar si el otro también dio like
    const [rows] = await db.query(
      "SELECT * FROM likes WHERE user_id = ? AND liked_user_id = ?",
      [likedUserId, userId]
    );

    if (rows.length > 0) {
      // registrar match
      await db.query(
        "INSERT IGNORE INTO matches (user1, user2) VALUES (?, ?)",
        [userId, likedUserId]
      );

      // notificar a ambos
      await createNotification(
        likedUserId,
        "match",
        "🔥 ¡Tienes un nuevo match!"
      );

      await createNotification(
        userId,
        "match",
        "🔥 ¡Tienes un nuevo match!"
      );

      return res.json({ match: true });
    }

    res.json({ match: false });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error enviando like" });
  }
};

export const getMatches = async (req, res) => {
  try {
    const db = await getDB();

    const [rows] = await db.query(
      `SELECT u.id, u.nombre, u.email, u.foto, u.descripcion
       FROM matches m
       JOIN users u ON (u.id = m.user1 OR u.id = m.user2)
       WHERE (m.user1 = ? OR m.user2 = ?) AND u.id != ?`,
      [req.user.id, req.user.id, req.user.id]
    );

    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: "Error cargando matches" });
  }
};
