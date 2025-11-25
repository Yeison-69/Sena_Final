import { getDB } from "../config/db.js";
import { createNotification } from "./notifController.js";

export const likeUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { targetId } = req.body;
    const db = await getDB();

    // 1) guardar like
    await db.query(
      "INSERT INTO likes (user_id, target_id) VALUES (?, ?)",
      [userId, targetId]
    );

    // 2) verificar si el otro también dio like
    const [rows] = await db.query(
      "SELECT * FROM likes WHERE user_id = ? AND target_id = ?",
      [targetId, userId]
    );

    const match = rows.length > 0;

    if (match) {
    // crear chat automáticamente
    const [chat] = await db.query(
      "INSERT INTO chats (user1_id, user2_id) VALUES (?, ?)",
      [userId, targetId]
    );

    await createNotification(userId, "¡Nuevo match! Ya puedes chatear.");
    await createNotification(targetId, "¡Nuevo match! Ya puedes chatear.");
}

    res.json({ ok: true, match });
  } catch (err) {
    console.error("Error en likeUser:", err);
    res.status(500).json({ message: "Error procesando like" });
  }
};
