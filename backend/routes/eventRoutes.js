import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createEvent,
  listEvents,
  updateEvent,
  deleteEvent,
  joinEvent
} from "../controllers/eventController.js";

const router = express.Router();

// listar
router.get("/", protect, listEvents);

// crear
router.post("/create", protect, createEvent);

// actualizar
router.put("/update/:id", protect, updateEvent);

// eliminar
router.delete("/:id", protect, deleteEvent);

// unirse
router.post("/:eventId/join", protect, joinEvent);

export default router;
