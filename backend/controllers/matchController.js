import db from "../config/db.js";

// Crear like
export const crearLike = async (req, res) => {
  try {
    const { usuario_id, like_usuario_id } = req.body;

    await db.query(
      "INSERT INTO likes (usuario_id, like_usuario_id) VALUES (?, ?)",
      [usuario_id, like_usuario_id]
    );

    res.json({ message: "Like registrado" });
  } catch (error) {
    console.error("Error crearLike:", error);
    res.status(500).json({ message: "Error al dar like" });
  }
};

// Obtener matches
export const obtenerMatches = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT u.id, u.nombre, u.foto 
       FROM likes l1
       INNER JOIN likes l2 
         ON l1.like_usuario_id = l2.usuario_id 
        AND l1.usuario_id = l2.like_usuario_id
       INNER JOIN users u ON u.id = l1.like_usuario_id
       WHERE l1.usuario_id = ?`,
      [req.params.id]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error obtenerMatches:", error);
    res.status(500).json({ message: "Error al obtener matches" });
  }
};

export default {
  crearLike,
  obtenerMatches
};
