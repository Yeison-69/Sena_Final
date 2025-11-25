import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool = null;

async function connectDB() {
  if (!pool) {
    pool = await mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "parchego",
      waitForConnections: true,
      connectionLimit: 10
    });
    console.log("📌 MySQL conectado");
  }
  return pool;
}

export async function getDB() {
  return await connectDB();
}

export default connectDB;
