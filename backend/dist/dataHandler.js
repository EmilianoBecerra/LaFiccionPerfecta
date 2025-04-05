"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDB = exports.readDB = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const DB_PATH = node_path_1.default.join(__dirname, "../data/db.json");
const readDB = async () => {
    const data = await node_fs_1.default.promises.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
};
exports.readDB = readDB;
const writeDB = (data) => {
    node_fs_1.default.promises.writeFile(DB_PATH, JSON.stringify(data, null, 2));
};
exports.writeDB = writeDB;
