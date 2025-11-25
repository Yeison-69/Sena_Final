import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import notifRoutes from "./routes/notifRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/notifications", notifRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🔥 Servidor en puerto ${PORT}`));
