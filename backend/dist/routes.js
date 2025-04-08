"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const dataHandler_1 = require("./dataHandler");
const uuid_1 = require("uuid");
exports.router = (0, express_1.Router)();
exports.router.get("/movies/:id/discussions", async (req, res, next) => {
    const { id } = req.params;
    try {
        const db = await (0, dataHandler_1.readDB)();
        const movie = await db.discussions.find((m) => m.idMovie === id);
        if (!movie) {
            res.end("");
        }
        else {
            res.json(movie.topics);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.router.post("/movies/:id/discussions", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, message } = req.body;
        const db = await (0, dataHandler_1.readDB)();
        const movie = db.discussions.find((m) => m.idMovie === id);
        const newTopic = {
            "topicId": (0, uuid_1.v4)(),
            title,
            message,
            "timestamp": new Date().toISOString(),
            "responses": []
        };
        if (!movie) {
            const newMovie = {
                "idMovie": `${id}`,
                "topics": [
                    {
                        "topicId": (0, uuid_1.v4)(),
                        title,
                        message,
                        "timestamp": new Date().toISOString(),
                        "responses": []
                    }
                ]
            };
            db.discussions.push(newMovie);
            await (0, dataHandler_1.writeDB)(db);
            res.status(201).json(newMovie);
            return;
        }
        else {
            movie.topics.push(newTopic);
            await (0, dataHandler_1.writeDB)(db);
            res.status(201).json(newTopic);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
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
