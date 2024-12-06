import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

// Crear el pool de conexiones
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Función para probar la conexión con reintentos
export async function connectWithRetry(retries = 5, delay = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const connection = await pool.getConnection();
      console.log("✅ Conexión exitosa a la base de datos MySQL");
      connection.release(); // Liberar la conexión
      return; // Salir si la conexión es exitosa
    } catch (error) {
      console.error(
        `❌ Error al conectar a la base de datos MySQL (Intento ${attempt}/${retries}):`,
        error
      );
      if (attempt < retries) {
        console.log(`Reintentando en ${delay / 1000} segundos... ⏳`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  console.error("❌ No se pudo conectar a la base de datos MySQL después de múltiples intentos.");
  process.exit(1); // Salir del proceso si no se puede conectar
}
