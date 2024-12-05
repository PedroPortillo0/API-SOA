import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Crear el pool de conexiones
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Función para probar la conexión
(async () => {
  try {
    const connection = await pool.getConnection(); // Intenta obtener una conexión del pool
    console.log("✅ Conexión exitosa a la base de datos MySQL");
    connection.release(); // Libera la conexión después de probarla
  } catch (error: any) {
    console.error("❌ Error al conectar a la base de datos MySQL:", error); // Imprime el error completo
  }
})();
