import { Router } from "express";
import { crearComentario, mostrarComentarios } from "../controllers/comentariosController.js";


const router = Router();

router.post("/:id/comentarios", crearComentario);
router.get("/:id/comentarios", mostrarComentarios);

export default router;
