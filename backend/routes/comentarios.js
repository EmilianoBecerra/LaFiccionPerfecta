import { Router } from "express";
import { crearComentario, mostrarComentarios, mostrarTodosLosComentarios } from "../controllers/comentariosController.js";


const router = Router();

router.post("/:id/comentarios", crearComentario);
router.get("/:id/comentarios", mostrarComentarios);
router.get("/verComentarios", mostrarTodosLosComentarios);

export default router;
