import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDB } from "../config/db.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password)
      return res.status(400).json({ message: "Faltan datos" });

    const db = getDB();

    const [exists] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (exists.length > 0)
      return res.status(400).json({ message: "Email ya registrado" });

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, hashed]
    );

    res.json({ message: "Usuario registrado correctamente" });
  } catch (e) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = getDB();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const user = rows[0];

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user,
    });
  } catch (e) {
    res.status(500).json({ message: "Error del servidor" });
  }
};
