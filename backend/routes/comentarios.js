import { Router } from "express";
import { crearComentario, mostrarComentarios, verTodosLosComentarios } from "../controllers/comentariosController.js";


const router = Router();

router.post("/:id/comentarios", crearComentario);
router.get("/:id/comentarios", mostrarComentarios);
router.get("/verComentarios", verTodosLosComentarios);

export default router;
