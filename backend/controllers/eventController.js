import { getDB } from "../config/db.js";

export const crearEvento = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, latitud, longitud, usuario_id } =
      req.body;

    const db = getDB();

    await db.query(
      "INSERT INTO eventos (titulo, descripcion, fecha, latitud, longitud, usuario_id) VALUES (?, ?, ?, ?, ?, ?)",
      [titulo, descripcion, fecha, latitud, longitud, usuario_id]
    );

    res.json({ message: "Evento creado" });
  } catch (e) {
    res.status(500).json({ message: "Error al crear evento" });
  }
};

export const obtenerEventos = async (req, res) => {
  const db = getDB();
  const [rows] = await db.query("SELECT * FROM eventos");
  res.json(rows);
};

export const actualizarEvento = async (req, res) => {
  const { titulo, descripcion, fecha, latitud, longitud } = req.body;

  const db = getDB();
  await db.query(
    "UPDATE eventos SET titulo=?, descripcion=?, fecha=?, latitud=?, longitud=? WHERE id=?",
    [titulo, descripcion, fecha, latitud, longitud, req.params.id]
  );
  res.json({ message: "Evento actualizado" });
};

export const eliminarEvento = async (req, res) => {
  const db = getDB();
  await db.query("DELETE FROM eventos WHERE id=?", [req.params.id]);
  res.json({ message: "Evento eliminado" });
};