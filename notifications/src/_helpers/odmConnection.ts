import mongoose from "mongoose";
import { mongoConfig } from "../_config/odm.config";

export async function connectWithRetry(
  retries = 5,
  delay = 1000,
  callback = () => {}
) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Intentar conectar a MongoDB
      await mongoose.connect(mongoConfig.url);
      console.log("Conexión a la base de datos exitosa ✅");

      // Ejecutar el callback después de una conexión exitosa
      callback();
      return; // Salir si la conexión es exitosa
    } catch (error) {
      console.error(
        `Error al conectar con MongoDB (Intento ${attempt}/${retries}): ❗`,
        error
      );

      // Si no es el último intento, esperar antes de volver a intentar
      if (attempt < retries) {
        console.log(`Reintentando en ${delay / 1000} segundos... ⏳`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // Si todos los intentos fallan, registrar el error crítico y finalizar
  console.error(
    "No se pudo conectar a MongoDB después de múltiples intentos. ❌"
  );
  process.exit(1); // Salir del proceso si no se logra conectar
}
