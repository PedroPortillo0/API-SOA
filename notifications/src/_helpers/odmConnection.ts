import mongoose from "mongoose";
import { mongoConfig } from "../_config/odm.config";

export async function connect(callback: () => void) {
  try {
    await mongoose.connect(mongoConfig.url);
    console.log("Conexión a la base de datos exitosa");
    callback();
  } catch (error) {
    console.error("Error al conectar con MongoDB: ", error);
    process.exit(1);
  }
}