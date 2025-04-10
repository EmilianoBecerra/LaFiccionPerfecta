"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//@ts-ignore
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const db_1 = __importDefault(require("./db"));
const PORT = 3000;
const app = (0, express_1.default)();
app.get("/ping", async (req, res) => {
    try {
        const [rows] = await db_1.default.execute("SELECT 1");
        res.send("Base de datos conectada!");
    }
    catch (err) {
        console.error("Errr de conexion");
        console.log(err);
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", routes_1.router);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
