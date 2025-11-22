import express from "express";
import {
  crearLike,
  obtenerMatches
} from "../controllers/matchController.js";

const router = express.Router();

router.post("/", crearLike);
router.get("/:id", obtenerMatches);

export default router;
