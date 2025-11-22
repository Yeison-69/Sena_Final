// backend/middleware/auth.js
import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "No autorizado. Falta token." });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // contiene id y email
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ error: "Token inválido o expirado." });
  }
}
