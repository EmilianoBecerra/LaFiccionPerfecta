import express, { NextFunction, Request, Response } from "express";
//@ts-ignore
import cors from "cors";
import { router } from "./routes";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
