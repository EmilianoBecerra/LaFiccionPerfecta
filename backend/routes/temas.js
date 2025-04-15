import express, { Router } from "express";
import {
  crearTema,
  obtenerTemasPorPelicula,
} from "../controllers/temasController.js";
const router = Router();

router.post("/:id/temas", crearTema);
router.get("/:id/temas", obtenerTemasPorPelicula);

export default router;
