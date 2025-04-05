import fs from "node:fs";
import path from "node:path";

const DB_PATH = path.join(__dirname, "../data/db.json");

export const readDB = async () => {
  const data = await fs.promises.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

export const writeDB = (data: any) => {
  fs.promises.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}
