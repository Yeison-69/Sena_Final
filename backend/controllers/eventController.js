import { getDB } from "../config/db.js";

export const getEvents = async (req, res) => {
  try {
    const db = await getDB();
    const [rows] = await db.query(`
      SELECT e.*, u.nombre AS creador_nombre
      FROM events e
      JOIN users u ON u.id = e.creator_id
      ORDER BY e.id DESC
    `);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error cargando eventos" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, imagen, map_url } = req.body;

    const db = await getDB();

    await db.query(
      "INSERT INTO events (titulo, descripcion, fecha, imagen, map_url, creator_id) VALUES (?, ?, ?, ?, ?, ?)",
      [titulo, descripcion, fecha, imagen, map_url, req.user.id]
    );

    res.json({ message: "Evento creado" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error creando evento" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id, titulo, descripcion, fecha, imagen, map_url } = req.body;

    const db = await getDB();

    await db.query(
      `UPDATE events SET 
        titulo=?, descripcion=?, fecha=?, imagen=?, map_url=?
       WHERE id=? AND creator_id=?`,
      [titulo, descripcion, fecha, imagen, map_url, id, req.user.id]
    );

    res.json({ message: "Evento actualizado" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error actualizando evento" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const db = await getDB();
    await db.query("DELETE FROM events WHERE id=? AND creator_id=?", [
      req.params.id,
      req.user.id,
    ]);
    res.json({ message: "Evento eliminado" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error eliminando evento" });
  }
};

export const joinEvent = async (req, res) => {
  res.json({ message: "Te uniste al evento (pendiente asistentes)" });
};
