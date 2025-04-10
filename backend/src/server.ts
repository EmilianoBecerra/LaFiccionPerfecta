import express, { NextFunction, Request, Response } from "express";
//@ts-ignore
import cors from "cors";
import { router } from "./routes";
import pool from "./db";

const PORT = 3000;
const app = express();

app.get("/ping", async (req: Request, res: Response) => {
  try{
    const [rows] = await pool.execute("SELECT 1");
    res.send("Base de datos conectada!");
  }catch(err) {
    console.error("Errr de conexion")
    console.log(err);
  }
})
app.use(cors());
app.use(express.json());
app.use("/api", router);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
