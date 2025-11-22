import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.// db.js
  
  import mysql from 'mysql2/promise';
  
  const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tu_contraseña', // Cambia esto a tu contraseña de MySQL
    database: 'parchego'
  });
  
  // Exportación default
  export default connection;env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

console.log("📌 MySQL conectado correctamente");

export default db;
