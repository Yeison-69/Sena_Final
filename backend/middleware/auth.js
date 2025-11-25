import jwt from "jsonwebtoken";
import { getDB } from "../config/db.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Token faltante o inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = await getDB();
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [decoded.id]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Token no válido" });
    }

    req.user = rows[0];
    next();
  } catch (err) {
    console.error("Token error:", err);
    res.status(401).json({ message: "Token expirado o inválido" });
  }
};
