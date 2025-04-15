import { Router } from "express";
import { crearComentario, mostrarComentario } from "../controllers/comentariosController.js";


const router = Router();

router.post("/:id/comentarios", crearComentario);
router.get("/:id/comentarios", mostrarComentario);

export default router;
