"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const db_1 = __importDefault(require("./db"));
exports.router = (0, express_1.Router)();
exports.router.get("/movies/:id/topics", async (req, res) => {
    try {
        const { id } = req.params;
        const topics = await db_1.default.execute("SELECT * FROM topics WHERE movie_ID = ?", [id]);
        console.log(topics);
        res.status(200).json(topics);
    }
    catch (err) {
        console.error("Error en la consulta");
        res.status(500).json({ error: "Ocurrió un error al hacer la consulta" });
    }
});
/*
router.get("/movies/:id/discussions", async (req: any, res: any, next) => {
  const { id } = req.params;
  try {
    const db = await readDB();
    const movie = await db.discussions.find((m: any) => m.idMovie === id);
    if (!movie) {
      res.end("")
    } else {
      res.json(movie.topics);
    }

  } catch (error) {
    console.log(error)
  }

})


router.post("/movies/:id/discussions", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { title, message } = req.body;
    const db = await readDB();
    const movie = db.discussions.find((m: any) => m.idMovie === id);

    const newTopic = {
      "topicId": uuidv4(),
      title,
      message,
      "timestamp": new Date().toISOString(),
      "responses": []
    }

    if (!movie) {
      const newMovie = {
        "idMovie": `${id}`,
        "topics": [
          {
            "topicId": uuidv4(),
            title,
            message,
            "timestamp": new Date().toISOString(),
            "responses": []
          }
        ]
      }
      db.discussions.push(newMovie);
      await writeDB(db);
      res.status(201).json(newMovie);
      return;
    } else {
      movie.topics.push(newTopic)
      await writeDB(db)
      res.status(201).json(newTopic);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
})

router.post("/movies/:id/discussions/:topicId/responses", async (req: any, res: any) => {
  const { id, topicId } = req.params;
  const { user, message } = req.body;

  if (!user || !message) {
    return res.status(404).json({ message: "Usuario y mensaje son obligatorios" });
  }

  const db: DB = await readDB();
  const movie: MovieDiscussion | undefined = db.discussions.find((m: any) => m.idMovie === id);

  if (!movie) {
    return res.status(404).json({ message: "Pelicula no encontrada" });
  }

  const topic: Topic | undefined = movie.topics.find((t: any) => t.topicId === topicId);

  if (!topic) {
    return res.status(404).json({ message: "Tema no encontrado" });
  }

  const newResponse: ResponseData = {
    responseId: `${topicId}-${Date.now()}`,
    user,
    message,
    timestamp: new Date().toISOString()
  };

  topic.response.push(newResponse);
  writeDB(db);

  res.status(201).json(newResponse);

})
 */
