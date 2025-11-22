import { getDB } from "../config/db.js";

export const getUsers = async (req, res) => {
  const db = getDB();
  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
};
