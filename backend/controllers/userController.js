// backend/controllers/userController.js
import { getDB } from "../config/db.js";

// obtener datos del usuario logueado
export const me = async (req, res) => {
  try {
    const db = await getDB();
    const [rows] = await db.query(
      "SELECT id, nombre, email, descripcion, foto FROM users WHERE id=?",
      [req.user.id]
    );

    if (!rows.length) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// actualizar perfil
export const updateProfile = async (req, res) => {
  try {
    const { nombre, descripcion, foto } = req.body;

    const db = await getDB();
    await db.query(
      "UPDATE users SET nombre=?, descripcion=?, foto=? WHERE id=?",
      [nombre, descripcion, foto, req.user.id]
    );

    res.json({ message: "Perfil actualizado correctamente" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error del servidor" });
  }
};
