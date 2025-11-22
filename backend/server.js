import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexion mysql
await connectDB;

// rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/matches", matchRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🔥 Servidor corriendo en puerto ${PORT}`));
