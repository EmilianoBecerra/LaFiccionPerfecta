import express from "express";
import temasRouter from "./routes/temas.js";
import comentariosRouter from "./routes/comentarios.js";
import conectarDB from "./config/db.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/peliculas/", temasRouter);
app.use("/api/temas/", comentariosRouter);
conectarDB();
app.listen(3000);
