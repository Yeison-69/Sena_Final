import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import notifRoutes from "./routes/notifRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// conectar DB
await connectDB();

app.use("/api/users", userRoutes);   // 🔥 PERFIL
app.use("/api/auth", authRoutes);    // 🔥 LOGIN/REGISTER
app.use("/api/events", eventRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/notificaciones", notifRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🔥 Servidor en puerto ${PORT}`));
