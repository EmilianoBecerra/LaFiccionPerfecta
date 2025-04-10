"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const access = {
    host: "localhost",
    user: "root",
    password: "1Mysql1_",
    database: "discussions",
    waitForConnections: true,
    connectionLimit: 10,
};
const pool = promise_1.default.createPool(access);
exports.default = pool;
