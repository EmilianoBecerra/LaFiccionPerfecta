import { Request, Response, Router } from "express";
import { readDB, writeDB } from "./dataHandler";
import { MovieDiscussion, Topic, ResponseData, DB } from "./interface";


export const router = Router();


router.get("/movies/:id/discussions", async (req: any, res: any) => {
  const { id } = req.params;
  const db = await readDB()
  const movie = await db.discussions.find((m: any) => m.idMovie === id);

  if (!movie) {
    return res.status(404).json({ message: "Pelicula no encontrada" });
  }

  res.json(movie.topics);
})


router.post("/movies/:id/discussions", async (req: any, res: any) => {
  const { id } = req.params;
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).json({ message: "Titulo y mensaje son obligatorios" });
  }

  const db: DB = await readDB();
  const movie: MovieDiscussion | undefined = db.discussions.find((m: any) => m.idMovie === id);

  if (!movie) {
    return res.status(404).json({ message: "Pelicula no encontrada" });
  }

  const newTopic: Topic = {
    topicId: `${Date.now()}`,
    title,
    message,
    timestamp: new Date().toISOString(),
    response: []
  }

  movie.topics.push(newTopic);
  writeDB(db);

  res.status(201).json(newTopic);
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
