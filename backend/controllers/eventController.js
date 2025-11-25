import { db } from "../config/db.js";
import { createNotification } from "./notifController.js";


// =============================
// 📌 CREAR EVENTO
// =============================
export const createEvent = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, imagen, map_url } = req.body;
    const creador_id = req.user.id;

    const [result] = await db.query(
      `INSERT INTO eventos (titulo, descripcion, fecha, imagen, map_url, creador_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [titulo, descripcion, fecha, imagen, map_url, creador_id]
    );

    return res.json({ id: result.insertId, message: "Evento creado" });
  } catch (e) {
    console.error("Error createEvent:", e);
    res.status(500).json({ error: "Error creando evento" });
  }
};


// =============================
// 📌 LISTAR EVENTOS
// =============================
export const listEvents = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        e.id,
        e.titulo,
        e.descripcion,
        e.fecha,
        e.imagen,
        e.map_url,
        e.creador_id,
        u.nombre AS creador_nombre
      FROM eventos e
      JOIN users u ON u.id = e.creador_id
      ORDER BY e.fecha ASC
    `);

    res.json(rows);
  } catch (e) {
    console.error("Error listEvents:", e);
    res.status(500).json({ error: "Error obteniendo eventos" });
  }
};


// =============================
// 📌 EDITAR EVENTO
// =============================
export const updateEvent = async (req, res) => {
  try {
    const { id, titulo, descripcion, fecha, imagen, map_url } = req.body;

    await db.query(
      `UPDATE eventos 
       SET titulo = ?, descripcion = ?, fecha = ?, imagen = ?, map_url = ?
       WHERE id = ?`,
      [titulo, descripcion, fecha, imagen, map_url, id]
    );

    res.json({ message: "Evento actualizado" });
  } catch (e) {
    console.error("Error updateEvent:", e);
    res.status(500).json({ error: "Error actualizando evento" });
  }
};


// =============================
// 📌 ELIMINAR EVENTO
// =============================
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(`DELETE FROM eventos WHERE id = ?`, [id]);

    res.json({ message: "Evento eliminado" });
  } catch (e) {
    console.error("Error deleteEvent:", e);
    res.status(500).json({ error: "Error eliminando evento" });
  }
};


// =============================
// 📌 UNIRSE A UN EVENTO
// =============================
export const joinEvent = async (req, res) => {
  console.log("➡️ joinEvent ejecutado");
  console.log("  req.params.id =", req.params.id);
  console.log("  req.user =", req.user);

  try {
    const eventoId = req.params.id;
    const userId = req.user?.id;

    if (!eventoId || !userId) {
      console.log("❌ Datos incompletos:", { eventoId, userId });
      return res.status(400).json({ error: "Datos incompletos" });
    }

    console.log("✔ Datos correctos:", { eventoId, userId });

    // Verificar si ya está unido
    const [exists] = await db.query(
      "SELECT id FROM participantes_evento WHERE evento_id = ? AND user_id = ?",
      [eventoId, userId]
    );

    if (exists.length > 0) {
      console.log("⚠️ Ya está unido al evento");
      return res.json({ message: "Ya estás unido" });
    }

    // Insertar participación
    await db.query(
      "INSERT INTO participantes_evento (evento_id, user_id) VALUES (?, ?)",
      [eventoId, userId]
    );

    console.log("✔ Insertado en participantes_evento");

    // Obtener creador del evento
    const [creatorRow] = await db.query(
      "SELECT creador_id, titulo FROM eventos WHERE id = ?",
      [eventoId]
    );

    const creador = creatorRow[0];

    // Enviar notificación
    await createNotification(
      creador.creador_id,
      `Un usuario se unió a tu evento "${creador.titulo}"`
    );

    console.log("✔ Notificación enviada");

    res.json({ message: "Unido al evento" });
  } catch (e) {
    console.error("Error joinEvent:", e);
    res.status(500).json({ error: "Error al unirse al evento" });
  }
};
