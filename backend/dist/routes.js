"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const dataHandler_1 = require("./dataHandler");
exports.router = (0, express_1.Router)();
exports.router.get("/movies/:id/discussions", async (req, res) => {
    const { id } = req.params;
    const db = await (0, dataHandler_1.readDB)();
    const movie = await db.discussions.find((m) => m.idMovie === id);
    if (!movie) {
        return res.status(404).json({ message: "Pelicula no encontrada" });
    }
    res.json(movie.topics);
});
exports.router.post("/movies/:id/discussions", async (req, res) => {
    const { id } = req.params;
    const { title, message } = req.body;
    if (!title || !message) {
        return res.status(400).json({ message: "Titulo y mensaje son obligatorios" });
    }
    const db = await (0, dataHandler_1.readDB)();
    const movie = db.discussions.find((m) => m.idMovie === id);
    if (!movie) {
        return res.status(404).json({ message: "Pelicula no encontrada" });
    }
    const newTopic = {
        topicId: `${Date.now()}`,
        title,
        message,
        timestamp: new Date().toISOString(),
        response: []
    };
    movie.topics.push(newTopic);
    (0, dataHandler_1.writeDB)(db);
    res.status(201).json(newTopic);
});
exports.router.post("/movies/:id/discussions/:topicId/responses", async (req, res) => {
    const { id, topicId } = req.params;
    const { user, message } = req.body;
    if (!user || !message) {
        return res.status(404).json({ message: "Usuario y mensaje son obligatorios" });
    }
    const db = await (0, dataHandler_1.readDB)();
    const movie = db.discussions.find((m) => m.idMovie === id);
    if (!movie) {
        return res.status(404).json({ message: "Pelicula no encontrada" });
    }
    const topic = movie.topics.find((t) => t.topicId === topicId);
    if (!topic) {
        return res.status(404).json({ message: "Tema no encontrado" });
    }
    const newResponse = {
        responseId: `${topicId}-${Date.now()}`,
        user,
        message,
        timestamp: new Date().toISOString()
    };
    topic.response.push(newResponse);
    (0, dataHandler_1.writeDB)(db);
    res.status(201).json(newResponse);
});
