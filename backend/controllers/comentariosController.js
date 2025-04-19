import Comentario from "../models/Comentario.js";

const crearComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenido, autor } = req.body;
    const comentarioNuevo = new Comentario({ contenido, autor, temaId: id });
    await comentarioNuevo.save();
    res.status(201).json(comentarioNuevo);
  } catch {
    res.status(500).json({ mensaje: "Error al agregar un comentario nuevo" });
  }
};

const mostrarComentarios = async (req, res) => {
  try {
    const { id } = req.params;
    const comentarios = await Comentario.find({ temaId: id}).exec();
    res.status(201).json(comentarios);
  } catch {
    res.status(500).json({ mensaje: "Error al buscar los comentarios" });
  }
};

export { crearComentario, mostrarComentarios };
