import express from "express";
import {
  crearEvento,
  obtenerEventos,
  actualizarEvento,
  eliminarEvento,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", crearEvento);
router.get("/", obtenerEventos);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

export default router;
