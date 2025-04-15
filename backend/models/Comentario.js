import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    default: "Anónimo",
  },
  temaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tema",
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Comentario", comentarioSchema);
