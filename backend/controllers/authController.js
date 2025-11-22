import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDB } from "../config/db.js";

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password)
      return res.status(400).json({ message: "Faltan datos" });

    const db = await getDB();
    const [exists] = await db.query("SELECT id FROM users WHERE email=?", [email]);

    if (exists.length) return res.status(400).json({ message: "Email ya registrado" });

    const hashed = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (nombre, email, password) VALUES (?,?,?)",
      [nombre, email, hashed]
    );

    const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ message: "OK", token, user: { id: result.insertId, nombre, email } });
  } catch (e) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = await getDB();
    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);

    if (!rows.length) return res.status(400).json({ message: "Usuario no encontrado" });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    delete user.password;

    res.json({ message: "OK", token, user });
  } catch (e) {
    res.status(500).json({ message: "Error del servidor" });
  }
};
