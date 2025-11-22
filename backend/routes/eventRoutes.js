import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  joinEvent
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/create", protect, createEvent);
router.put("/update", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);
router.post("/:id/join", protect, joinEvent);

export default router;
