import Tema from "../models/Tema.js";

const crearTema = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const { id } = req.params;
    const nuevoTema = new Tema({ titulo, descripcion, peliculaId: +id });
    await nuevoTema.save();
    res.status(201).json(nuevoTema);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear tema" });
  }
};

const obtenerTemasPorPelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const temas = await Tema.find({ peliculaId: id });
    res.json(temas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener temas" });
  }
};

export { crearTema, obtenerTemasPorPelicula };
