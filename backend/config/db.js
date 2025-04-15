import mongoose from "mongoose";
import 'dotenv/config';


const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MOONGODB");
  } catch (error) {
    console.error("Error al conectar a MONGODB", error);
    process.exit(1);
  }
};
export default conectarDB;
